import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  ThirdwebProvider,
  useReadContract, // 1. Remplacement de useTokenBalance
} from "thirdweb/react";
import { getContract, createThirdwebClient } from "thirdweb";
import { balanceOf, symbol } from "thirdweb/extensions/erc20"; // 2. Importation des méthodes ERC20
import { toEther } from "thirdweb/utils"; // 3. Importation pour formater le solde
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

  // 4. Remplacement de useTokenBalance par useReadContract pour le solde
  const { data: balanceData, isLoading: isBalanceLoading } = useReadContract({
    contract: contract,
    method: balanceOf,
    params: [address || ""], // Fournir une adresse vide si non connecté
  });

  // 5. Ajout d'un appel pour obtenir le symbole
  const { data: symbolData, isLoading: isSymbolLoading } = useReadContract({
    contract: contract,
    method: symbol,
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
          // 6. Mise à jour de l'affichage
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
