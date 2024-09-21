"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Keypair, PrivKey } from "maci-domainobjs";
import { useAccount, useSignMessage } from "wagmi";
import { MACIWrapper } from "@/contracts/MACIWrapper";
import { publicClient } from '@/utils/client'

interface IAuthContext {
  isRegistered: boolean;
  keypair: Keypair | null;
  stateIndex: bigint | null;
  generateKeypair: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default async function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  const [keypair, setKeyPair] = useState<Keypair | null>(null);
  const [stateIndex, setStateIndex] = useState<bigint | null>(null);
  const [signatureMessage, setSignatureMessage] = useState<string>("");

  const { signMessageAsync } = useSignMessage({ message: signatureMessage });

  useEffect(() => {
    setSignatureMessage(`Login to ${window.location.origin}`);
  }, []);

  const generateKeypair = useCallback(() => {
    if (!address) return;

    (async () => {
      try {
        const signature = await signMessageAsync({ message: signatureMessage });
        const userKeyPair = new Keypair(new PrivKey(signature));
        setKeyPair(userKeyPair);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [address, signMessageAsync]);

  useEffect(() => {
    setKeyPair(null);

    generateKeypair();
  }, [generateKeypair]);

  const refetchIsRegistered = async () => {
    const isRegistered = await publicClient.readContract({
        address: '0x89eD382d4B94Db5dcf436b40795199708aC4f05d',
        abi: MACIWrapper,
        functionName: "isPublicKeyRegistered",
        args: keypair ? keypair.pubKey.rawPubKey : [BigInt(0), BigInt(0)],
    });
    return isRegistered;
}

  const chainId = 11155111;

  useEffect(() => {
    if (!keypair || !SignUpEvents || !SignUpEvents.length) {
      setStateIndex(null);
      return;
    }


  useScaffoldEventSubscriber({
    contractName: "MACIWrapper",
    eventName: "SignUp",
    listener: logs => {
      logs.forEach(log => {
        if (
          (keypair?.pubKey.asContractParam().x !== undefined &&
            log.args._userPubKeyX !== BigInt(keypair?.pubKey.asContractParam().x)) ||
          (keypair?.pubKey.asContractParam().y !== undefined &&
            log.args._userPubKeyY !== BigInt(keypair?.pubKey.asContractParam().y))
        )
          return;
        refetchIsRegistered();
        setStateIndex(log.args._stateIndex || null);
      });
    },
  });

  return (
    <AuthContext.Provider value={{ isRegistered: Boolean(isRegistered), keypair, stateIndex, generateKeypair }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
