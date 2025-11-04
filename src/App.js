import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  ThirdwebProvider,
  useTokenBalance,
} from "thirdweb/react";
import { getContract, createThirdwebClient } from "thirdweb";
import "./App.css";

const client = createThirdwebClient({
  clientId: "5a24a9d93adac32e424173823edafb05",
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

  const { data: balance, isLoading } = useTokenBalance({
    contract: contract,
    address: address,
  });

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
    <ThirdwebProvider>
      <Dashboard />
    </ThirdwebProvider>
  );
}
