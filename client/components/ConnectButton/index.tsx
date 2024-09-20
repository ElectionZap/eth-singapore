"use client";

import * as React from "react";
import { useWallet } from "@/contexts/Wallet";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";

export default function ConnectButton() {
  const { account, setAccount, setSigner } = useWallet();

  const SEPOLIA_CHAIN_ID = "0xaa36a7";

  function isProviderRpcError(error: unknown): error is { code: number } {
    return typeof error === "object" && error !== null && "code" in error;
  }

  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        // Request account access if needed
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Check if the user is connected to the Sepolia network
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (currentChainId !== SEPOLIA_CHAIN_ID) {
          // If not, request a network change
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: SEPOLIA_CHAIN_ID }],
            });
          } catch (switchError: unknown) {
            if (isProviderRpcError(switchError)) {
              // This error code indicates that the chain has not been added to MetaMask
              if (switchError.code === 4902) {
                try {
                  // Add Sepolia network to MetaMask
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: SEPOLIA_CHAIN_ID,
                        chainName: "Sepolia Test Network",
                        nativeCurrency: {
                          name: "SepoliaETH",
                          symbol: "ETH",
                          decimals: 18,
                        },
                        rpcUrls: ["https://rpc.sepolia.org"], // You can use a public RPC URL here
                        blockExplorerUrls: ["https://sepolia.etherscan.io"],
                      },
                    ],
                  });
                } catch (addError: unknown) {
                  console.error("Failed to add Sepolia network:", addError);
                }
              } else {
                console.error(
                  "Failed to switch to Sepolia network:",
                  switchError
                );
              }
            } else {
              console.error(
                "Failed to switch network: Unknown error",
                switchError
              );
            }
          }
        }
        // Now, get the provider and signer from MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        // Set the account and signer in your context
        setAccount(userAddress);
        setSigner(signer);
      } catch (error: unknown) {
        console.error("Error connecting wallet: ", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="w-36 flex items-center">
      {account ? (
        <p className="ml-4 text-sm text-foreground truncate">
          {account?.substring(0, 5) + "..." + account?.substring(38, 42)}
        </p>
      ) : (
        <>
          <Button
            onClick={connectWallet}
            size="sm"
            className="hidden text-base md:inline-flex"
          >
            Connect
          </Button>
          <Button
            onClick={connectWallet}
            size="sm"
            className="text-base md:hidden"
          >
            Connect
          </Button>
        </>
      )}
    </div>
  );
}
