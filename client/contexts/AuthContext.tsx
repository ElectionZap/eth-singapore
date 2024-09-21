"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Keypair, PrivKey } from "maci-domainobjs";
import { useAccount, useSignMessage } from "wagmi";
import { MACIWrapper } from "@/contracts/MACIWrapper";
import { publicClient } from '@/utils/client'

interface IAuthContext {
  keypair: Keypair | null;
  stateIndex: bigint | null;
  generateKeypair: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default async function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  const [keypair, setKeyPair] = useState<Keypair | null>(null);
  const [stateIndex, setStateIndex] = useState<bigint | null>(null);


  const generateKeypair = useCallback(() => {
    if (!address) return;

    (async () => {
      try {
        const userKeyPair = new Keypair(new PrivKey(signature));
        setKeyPair(userKeyPair);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [address]);

  useEffect(() => {
    setKeyPair(null);

    generateKeypair();
  }, [generateKeypair]);

  return (
    <AuthContext.Provider value={{ keypair, stateIndex, generateKeypair }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
