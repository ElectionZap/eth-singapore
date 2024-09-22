import { walletClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper';

export const signUp = async (
    pubKey: {x:bigint; y:bigint}, 
    signUpGatekeeperData: `0x${string}`,
    initialVoiceCreditProxyData: `0x${string}`,

) => {
    const [account] = await walletClient.getAddresses()
    const tx = await walletClient.writeContract({
        address: '0xac1ee4e757467F4c844D346630e7439DD931ceCc',
        abi: MACIWrapper,
        functionName: 'signUp',
        args: [pubKey, signUpGatekeeperData, initialVoiceCreditProxyData],
        account
      })
      return tx
}