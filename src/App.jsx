import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThirdwebProvider, useReadContract } from "thirdweb/react";
import { getContract, createThirdwebClient } from "thirdweb";
import { toEther } from "thirdweb/utils";
import { Wallet } from "lucide-react";
import "./App.css";

const client = createThirdwebClient({
  clientId: "5a24a9d93adac32e424173823edafb05",
});

const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c";

function Hero() {
  const { address } = useAccount();

  const contract = useMemo(() => {
    return getContract({
      client,
      chain: baseSepolia,
      address: TTC_CONTRACT,
    });
  }, []);

  const { data: balanceData, isLoading: isBalanceLoading } = useReadContract({
    contract: contract,
    method: "balanceOf",
    params: [address || ""],
  });

  const { data: symbolData, isLoading: isSymbolLoading } = useReadContract({
    contract: contract,
    method: "symbol",
    params: [],
  });

  const isLoading = isBalanceLoading || isSymbolLoading;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center">
      
      <h1 className="text-6xl font-bold text-green-400 mb-4">
        The Canopy Club 🌿
      </h1>
      
      <h2 className="text-2xl text-gray-300 mb-10">
        Votre token pour un futur plus vert et technologique.
      </h2>
      
      <div className="mb-8">
        <ConnectButton />
      </div>

      {address && (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          {isLoading ? (
            <p className="text-gray-400">Chargement du solde...</p>
          ) : (
            <div className="flex items-center space-x-3">
              <Wallet className="text-green-400" size={24} />
              <p className="text-xl">
                Solde :{" "}
                <span className="font-bold text-green-400">
                  {balanceData ? toEther(balanceData) : "0"} {symbolData}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {!address && (
        <p className="text-gray-500">
          Connectez votre wallet pour voir votre solde TTC.
        </p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThirdwebProvider>
      <Hero />
    </ThirdwebProvider>
  );
}
