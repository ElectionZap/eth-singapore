import { walletClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper';

export const updatePollTallyCID = async (
    pollId: bigint,
    tallyJsonCID: string,
) => {
    const [account] = await walletClient.getAddresses()
    await walletClient.writeContract({
        address: '0x89eD382d4B94Db5dcf436b40795199708aC4f05d',
        abi: MACIWrapper,
        functionName: 'updatePollTallyCID',
        args: [pollId, tallyJsonCID],
        account
      })
}