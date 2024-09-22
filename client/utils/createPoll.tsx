import { walletClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper';
export default async function createPoll(
    {
    name, 
    options,
    metadata,
    duration,
    isQv,
    }:
    {
        name: string, 
        options: string[],
        metadata: string,
        duration: bigint,
        isQv: number,
        }
) {
    if (!Array.isArray(options) || !name || !metadata || !duration || isQv === undefined) {
        throw new Error("Invalid arguments passed to createPoll.");
    }

    console.log('Poll args:', { name, options, metadata, duration, isQv });

    const [account] = await walletClient.getAddresses();
    
    const tx = await walletClient.writeContract({
        address: '0xac1ee4e757467F4c844D346630e7439DD931ceCc', 
        abi: MACIWrapper,
        functionName: 'createPoll',
        args: [name, options, metadata, duration, isQv],  
        account,
    });
    return tx;
}
