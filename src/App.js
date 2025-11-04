import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  ThirdwebProvider,
  useReadContract,
} from "thirdweb/react";
import { getContract, createThirdwebClient } from "thirdweb";
// import { balanceOf, symbol } from "thirdweb/extensions/erc20"; // <-- LIGNE SUPPRIMÉE
import { toEther } from "thirdweb/utils";
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

  // 4. Appel de useReadContract avec le nom de la fonction (string)
  const { data: balanceData, isLoading: isBalanceLoading } = useReadContract({
    contract: contract,
    method: "balanceOf", // <-- CORRIGÉ
    params: [address || ""],
  });

  // 5. Appel de useReadContract avec le nom de la fonction (string)
  const { data: symbolData, isLoading: isSymbolLoading } = useReadContract({
    contract: contract,
    method: "symbol", // <-- CORRIGÉ
    params: [],
  });

  const isLoading = isBalanceLoading || isSymbolLoading;

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
            💰 Solde TTC : {balanceData ? toEther(balanceData) : "0"}{" "}
            {symbolData}
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
