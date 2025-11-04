import React, { useMemo } from "react";
import { WagmiProvider, createConfig, http, useAccount } from "wagmi";
import { mainnet, baseSepolia } from "wagmi/chains";
import {
  RainbowKitProvider,
  getDefaultWallets,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import {
  ThirdwebProvider,
  useReadContract, // 1. Remplacer 'useTokenBalance'
} from "thirdweb/react";
import { getContract, createThirdwebClient } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc20"; // 2. Importer l'extension
import { ethers } from "ethers";
import "./App.css";

const client = createThirdwebClient({
  clientId: "5a24a9d93adac32e424173823edafb05",
});

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
  const { address } = useAccount();

  const contract = useMemo(() => {
    return getContract({
      client,
      chain: baseSepolia,
      address: TTC_CONTRACT,
    });
  }, []);

  // 3. Remplacer l'appel du hook
  const { data: balance, isLoading } = useReadContract(
    balanceOf, // La fonction d'extension
    {
      contract: contract,
      address: address, // L'adresse du portefeuille à vérifier
    }
  );

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
            {/* Le format de 'balance' est le même, donc ceci fonctionne toujours */}
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
