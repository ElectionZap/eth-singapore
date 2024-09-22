import { walletClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper';



export const updatePollTallyCID = async (
    pollId: bigint,
    tallyJsonCID: string,
) => {
    const [account] = await walletClient.getAddresses()
    await walletClient.writeContract({
        address: '0xac1ee4e757467F4c844D346630e7439DD931ceCc',
        abi: MACIWrapper,
        functionName: 'updatePollTallyCID',
        args: [pollId, tallyJsonCID],
        account
      })
}