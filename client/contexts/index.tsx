import { ReactNode } from "react";
import { WalletProvider } from "./Wallet";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
      <WalletProvider>{children}</WalletProvider>
  );
};
