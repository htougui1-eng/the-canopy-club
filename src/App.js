import React from "react";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, baseSepolia } from "@wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  RainbowKitProvider,
  getDefaultWallets,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import { ThirdwebProvider, useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import "./App.css";

// Configuration des réseaux
const { chains, provider } = configureChains(
  [baseSepolia, mainnet],
  [publicProvider()]
);

// Connexion RainbowKit
const { connectors } = getDefaultWallets({
  appName: "The Canopy Club",
  chains,
});

// Client Wagmi
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Adresse du contrat TTC sur Base Sepolia
const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c";

function Dashboard() {
  const address = useAddress();
  const { contract } = useContract(TTC_CONTRACT, "token");
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
    <ThirdwebProvider activeChain="baseSepolia">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Dashboard />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThirdwebProvider>
  );
}
