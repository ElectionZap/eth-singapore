import { publicClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper';

export const fetchPoll = async (id: bigint) => {
    const data = await publicClient.readContract({
        address: '0x89eD382d4B94Db5dcf436b40795199708aC4f05d',
        abi: MACIWrapper,
        functionName: 'fetchPoll',
        args: [id],
      })
    return data;
}