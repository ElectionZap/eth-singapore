import { walletClient } from './client'
import { poll } from '../contracts/poll';
import { Message } from 'maci-domainobjs';

export const publishMessage = async (
    message: bigint[],
    pubKey: {x:bigint; y:bigint}, 
    pollAddress: `0x${string}`
) => {
    const [account] = await walletClient.getAddresses()
    const tx = await walletClient.writeContract({
        address: '0xb544625c5Fe216872028ab9D7c7cB0032Fc0d96C',
        abi: poll,
        functionName: 'publishMessage',
        args: [message, pubKey],
        account
      })
      return tx
}