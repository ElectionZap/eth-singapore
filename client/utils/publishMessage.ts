import { walletClient } from './client'
import { poll } from '../contracts/poll';

export const publishMessage = async (
    message: string,
    pubKey: {x:bigint; y:bigint}, 
    pollAddress: `0x${string}`
) => {
    const [account] = await walletClient.getAddresses()
    const tx = await walletClient.writeContract({
        address: pollAddress,
        abi: [poll],
        functionName: 'publishMessage',
        args: [message, pubKey],
        account
      })
      return tx
}