// context/WalletContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";

interface WalletContextType {
  account: string | null;
  signer: ethers.Signer | null;
  setAccount: (account: string | null) => void;
  setSigner: (signer: ethers.Signer | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  return (
    <WalletContext.Provider value={{ account, signer, setAccount, setSigner }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
