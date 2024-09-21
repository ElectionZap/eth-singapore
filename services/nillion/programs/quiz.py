from nada_dsl import *

def nada_main():
    party1 = Party(name="Party1")

    # Supporting question inputs (answers are integers from 1 to 5)
    q1_answer = SecretUnsignedInteger(Input(name="q1_answer", party=party1))
    q2_answer = SecretUnsignedInteger(Input(name="q2_answer", party=party1))
    q3_answer = SecretUnsignedInteger(Input(name="q3_answer", party=party1))
    q4_answer = SecretUnsignedInteger(Input(name="q4_answer", party=party1))
    q5_answer = SecretUnsignedInteger(Input(name="q5_answer", party=party1))
    q6_answer = SecretUnsignedInteger(Input(name="q6_answer", party=party1))

    q1_option0_weights = [
        SecretUnsignedInteger(Input(name="q1_option0_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q1_option0_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q1_option0_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q1_option0_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q1_option0_weight_5", party=party1))
    ]
    q1_option1_weights = [
        SecretUnsignedInteger(Input(name="q1_option1_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q1_option1_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q1_option1_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q1_option1_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q1_option1_weight_5", party=party1))
    ]

    q2_option0_weights = [
        SecretUnsignedInteger(Input(name="q2_option0_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q2_option0_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q2_option0_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q2_option0_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q2_option0_weight_5", party=party1))
    ]
    q2_option1_weights = [
        SecretUnsignedInteger(Input(name="q2_option1_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q2_option1_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q2_option1_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q2_option1_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q2_option1_weight_5", party=party1))
    ]

    q3_option0_weights = [
        SecretUnsignedInteger(Input(name="q3_option0_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q3_option0_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q3_option0_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q3_option0_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q3_option0_weight_5", party=party1))
    ]
    q3_option1_weights = [
        SecretUnsignedInteger(Input(name="q3_option1_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q3_option1_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q3_option1_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q3_option1_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q3_option1_weight_5", party=party1))
    ]

    q4_option0_weights = [
        SecretUnsignedInteger(Input(name="q4_option0_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q4_option0_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q4_option0_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q4_option0_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q4_option0_weight_5", party=party1))
    ]
    q4_option1_weights = [
        SecretUnsignedInteger(Input(name="q4_option1_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q4_option1_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q4_option1_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q4_option1_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q4_option1_weight_5", party=party1))
    ]

    q5_option0_weights = [
        SecretUnsignedInteger(Input(name="q5_option0_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q5_option0_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q5_option0_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q5_option0_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q5_option0_weight_5", party=party1))
    ]
    q5_option1_weights = [
        SecretUnsignedInteger(Input(name="q5_option1_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q5_option1_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q5_option1_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q5_option1_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q5_option1_weight_5", party=party1))
    ]

    q6_option0_weights = [
        SecretUnsignedInteger(Input(name="q6_option0_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q6_option0_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q6_option0_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q6_option0_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q6_option0_weight_5", party=party1))
    ]
    q6_option1_weights = [
        SecretUnsignedInteger(Input(name="q6_option1_weight_1", party=party1)),
        SecretUnsignedInteger(Input(name="q6_option1_weight_2", party=party1)),
        SecretUnsignedInteger(Input(name="q6_option1_weight_3", party=party1)),
        SecretUnsignedInteger(Input(name="q6_option1_weight_4", party=party1)),
        SecretUnsignedInteger(Input(name="q6_option1_weight_5", party=party1))
    ]

    # Function to select the correct weight based on the answer using conditional logic
    def select_weight(answer, weights):
        return (
            (answer == UnsignedInteger(1)).if_else(weights[0],
            (answer == UnsignedInteger(2)).if_else(weights[1],
            (answer == UnsignedInteger(3)).if_else(weights[2],
            (answer == UnsignedInteger(4)).if_else(weights[3],
            weights[4]))))
        )

    # Calculate total option 0 weight
    total_option0_weight = UnsignedInteger(0)
    total_option0_weight += select_weight(q1_answer, q1_option0_weights)
    total_option0_weight += select_weight(q2_answer, q2_option0_weights)
    total_option0_weight += select_weight(q3_answer, q3_option0_weights)
    total_option0_weight += select_weight(q4_answer, q4_option0_weights)
    total_option0_weight += select_weight(q5_answer, q5_option0_weights)
    total_option0_weight += select_weight(q6_answer, q6_option0_weights)

    # Calculate total option 1 weight
    total_option1_weight = UnsignedInteger(0)
    total_option1_weight += select_weight(q1_answer, q1_option1_weights)
    total_option1_weight += select_weight(q2_answer, q2_option1_weights)
    total_option1_weight += select_weight(q3_answer, q3_option1_weights)
    total_option1_weight += select_weight(q4_answer, q4_option1_weights)
    total_option1_weight += select_weight(q5_answer, q5_option1_weights)
    total_option1_weight += select_weight(q6_answer, q6_option1_weights)

    # Determine the final choice
    # If option1 weight > option0 weight, choose option1 (1), else option0 (0)
    final_choice = (total_option1_weight > total_option0_weight).if_else(
        UnsignedInteger(1), UnsignedInteger(0)
    )

    # Output the final choice
    # 0 => option0, 1 => option1
    return [Output(final_choice, "final_choice", party1)]
