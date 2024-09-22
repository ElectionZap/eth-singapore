import { Keypair, PrivKey } from "maci-domainobjs";
import { walletClient } from "./client";


export const generateKeypair = async () => {
    const [account] = await walletClient.getAddresses();
    const signature = await walletClient.signMessage({ 
        account,
        message: 'Generate Keypair 5',
      })
      try {
        const userKeyPair = new Keypair(new PrivKey(signature));
        return userKeyPair;
    } catch (err) {
        console.error(err);
      }
  }