import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import py_nillion_client as nillion
from dotenv import load_dotenv

from nillion_python_helpers import get_quote_and_pay, create_nillion_client, create_payments_config

from cosmpy.aerial.client import LedgerClient
from cosmpy.aerial.wallet import LocalWallet
from cosmpy.crypto.keypairs import PrivateKey

app = Flask(__name__)
CORS(app)

load_dotenv()

client = None
payments_wallet = None
payments_client = None
program_id = None
cluster_id = None
party_id = None
user_id = None

async def initialize():
    global client, payments_wallet, payments_client, program_id, cluster_id, party_id, user_id

    cluster_id = os.getenv("NILLION_CLUSTER_ID")
    grpc_endpoint = os.getenv("NILLION_NILCHAIN_GRPC")
    chain_id = os.getenv("NILLION_NILCHAIN_CHAIN_ID")

    seed = "my_seed"
    userkey = nillion.UserKey.from_seed(seed)
    nodekey = nillion.NodeKey.from_seed(seed)

    client = create_nillion_client(userkey, nodekey)
    party_id = client.party_id
    user_id = client.user_id

    program_name = "quiz"
    program_mir_path = f"binaries/{program_name}.nada.bin"
    program_id = f"{user_id}/{program_name}"

    payments_config = create_payments_config(chain_id, grpc_endpoint)
    payments_client = LedgerClient(payments_config)
    payments_wallet = LocalWallet(
        PrivateKey(bytes.fromhex(os.getenv("NILLION_NILCHAIN_PRIVATE_KEY_0"))),
        prefix="nillion",
    )

    try:
        receipt_store_program = await get_quote_and_pay(
            client,
            nillion.Operation.store_program(program_mir_path),
            payments_wallet,
            payments_client,
            cluster_id,
        )

        await client.store_program(
            cluster_id, program_name, program_mir_path, receipt_store_program
        )
        print(f"Stored program. program_id: {program_id}")
    except Exception as e:
        print(f"Error in storing program: {e}")

@app.route('/store_values', methods=['POST'])
def store_values():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Collect all weight inputs
    weights = {}
    for q_num in range(1, 7):
        for weight_type in ['option0', 'option1']:
            for ans_num in range(1, 6):
                key = f'q{q_num}_{weight_type}_weight_{ans_num}'
                value = data.get(key)
                if value is None:
                    return jsonify({'error': f'Missing {key}'}), 400
                weights[key] = int(value)

    async def store_secret():
        try:
            # Create a secret named for each weight
            secret_values = {}
            for key, value in weights.items():
                secret_values[key] = nillion.SecretUnsignedInteger(value)

            new_secret = nillion.NadaValues(secret_values)

            party_name = "Party1"

            permissions = nillion.Permissions.default_for_user(client.user_id)
            permissions.add_compute_permissions({client.user_id: {program_id}})

            # Pay for and store the secret
            receipt_store = await get_quote_and_pay(
                client,
                nillion.Operation.store_values(new_secret, ttl_days=5),
                payments_wallet,
                payments_client,
                cluster_id,
            )
            store_id = await client.store_values(
                cluster_id, new_secret, permissions, receipt_store
            )
            print(f"Stored secret with store_id: {store_id}")
            return {'store_id': store_id}
        except Exception as e:
            print(f"Error in storing values: {e}")
            return {'error': str(e)}

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(store_secret())

    if 'error' in result:
        return jsonify(result), 500
    else:
        return jsonify(result)

@app.route('/compute', methods=['POST'])
def compute():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    store_id = data.get('store_id')
    q1_answer = data.get('q1_answer')
    q2_answer = data.get('q2_answer')
    q3_answer = data.get('q3_answer')
    q4_answer = data.get('q4_answer')
    q5_answer = data.get('q5_answer')
    q6_answer = data.get('q6_answer')

    if not store_id:
        return jsonify({'error': 'store_id is required'}), 400
    if q1_answer is None or q2_answer is None or q3_answer is None or q4_answer is None or q5_answer is None or q6_answer is None:
        return jsonify({'error': 'All answers (q1_answer, q2_answer, q3_answer, q4_answer, q5_answer, q6_answer) are required'}), 400

    async def perform_computation():
        try:
            # Create compute bindings
            compute_bindings = nillion.ProgramBindings(program_id)
            party_name = "Party1"
            compute_bindings.add_input_party(party_name, party_id)
            compute_bindings.add_output_party(party_name, party_id)

            # Add user's answers at computation time
            computation_time_secrets = nillion.NadaValues({
                "q1_answer": nillion.SecretUnsignedInteger(int(q1_answer)),
                "q2_answer": nillion.SecretUnsignedInteger(int(q2_answer)),
                "q3_answer": nillion.SecretUnsignedInteger(int(q3_answer)),
                "q4_answer": nillion.SecretUnsignedInteger(int(q4_answer)),
                "q5_answer": nillion.SecretUnsignedInteger(int(q5_answer)),
                "q6_answer": nillion.SecretUnsignedInteger(int(q6_answer))
            })

            receipt_compute = await get_quote_and_pay(
                client,
                nillion.Operation.compute(program_id, computation_time_secrets),
                payments_wallet,
                payments_client,
                cluster_id,
            )

            compute_id = await client.compute(
                cluster_id,
                compute_bindings,
                [store_id],
                computation_time_secrets,
                receipt_compute,
            )

            print(f"The computation was sent to the network. compute_id: {compute_id}")
            while True:
                compute_event = await client.next_compute_event()
                if isinstance(compute_event, nillion.ComputeFinishedEvent):
                    print(f"✅  Compute complete for compute_id {compute_event.uuid}")
                    print(f"🖥️  The result is {compute_event.result.value}")
                    return {'result': compute_event.result.value}
        except Exception as e:
            print(f"Error in computation: {e}")
            return {'error': str(e)}

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(perform_computation())

    if 'error' in result:
        return jsonify(result), 500
    else:
        return jsonify(result)

if __name__ == "__main__":
    asyncio.run(initialize())

    app.run(host='0.0.0.0', port=5000)
