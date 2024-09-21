import { walletClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper';

export const signUp = async (
    pubKey: {x:bigint; y:bigint}, 
    signUpGatekeeperData: `0x${string}`,
    initialVoiceCreditProxyData: `0x${string}`,

) => {
    const [account] = await walletClient.getAddresses()
    const tx = await walletClient.writeContract({
        address: '0x89eD382d4B94Db5dcf436b40795199708aC4f05d',
        abi: MACIWrapper,
        functionName: 'signUp',
        args: [pubKey, signUpGatekeeperData, initialVoiceCreditProxyData],
        account
      })
      return tx
}