import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { lineaSepolia, sepolia } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: lineaSepolia,
  transport: http()
})

export const walletClient = createWalletClient({
    chain: lineaSepolia,
    transport: custom(window.ethereum!)
  })