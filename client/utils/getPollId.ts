import { publicClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper';

export const fetchPoll = async (address: `0x${string}`) => {
    const data = await publicClient.readContract({
        address: '0xac1ee4e757467F4c844D346630e7439DD931ceCc',
        abi: MACIWrapper,
        functionName: 'getPollId',
        args: [address],
      })
    return data;
}