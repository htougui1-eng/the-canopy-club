import React from "react";
// ⬇️ 'useAccount' remplace 'useAddress'
import { WagmiProvider, createConfig, http, useAccount } from "wagmi";
import { mainnet, baseSepolia } from "wagmi/chains";
import {
  RainbowKitProvider,
  getDefaultWallets,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import {
  ThirdwebProvider,
  useContract,
  useTokenBalance,
} from "thirdweb/react";
import { ethers } from "ethers";
import "./App.css";

const chains = [baseSepolia, mainnet];

const { connectors } = getDefaultWallets({
  appName: "The Canopy Club",
  projectId: "022f4d2b264c02a364fc9ff43079a707",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  chains,
  transports: {
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c";

function Dashboard() {
  // ⬇️ Remplacement de 'useAddress' par 'useAccount'
  const { address } = useAccount();
  const { contract } = useContract(TTC_CONTRACT);
  const { data: balance, isLoading } = useTokenBalance(contract, address);

  return (
    <div className="App">
      <h1>The Canopy Club 🌿</h1>
      <h2>Token TTC Dashboard</h2>

      <ConnectButton />

      {address ? (
        isLoading ? (
          <p>Chargement du solde...</p>
        ) : (
          <p>
            💰 Solde TTC : {balance?.displayValue} {balance?.symbol}
          </p>
        )
      ) : (
        <p>Connecte ton wallet pour voir ton solde TTC</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider chains={chains}>
        <ThirdwebProvider>
          <Dashboard />
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
