import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThirdwebProvider, useReadContract } from "thirdweb/react";
import { getContract, createThirdwebClient } from "thirdweb";
import { toEther } from "thirdweb/utils";
import { Wallet, Target, Gem, Sprout } from "lucide-react"; // Ajout des nouvelles icônes
import "./App.css";

const client = createThirdwebClient({
  clientId: "5a24a9d93adac32e424173823edafb05",
});

const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c";

// --- COMPOSANT HERO (inchangé) ---
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

// --- NOUVEAU COMPOSANT : ABOUT SECTION ---
function AboutSection() {
  return (
    // Section avec un fond légèrement différent pour la démarquer
    <section className="bg-slate-950 text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Titre de la section */}
        <h2 className="text-4xl font-bold mb-4">
          À Propos de <span className="text-green-400">The Canopy Club</span>
        </h2>
        
        {/* Paragraphe de mission */}
        <p className="text-lg text-gray-400 mb-12">
          Notre mission est de fusionner la finance décentralisée avec des initiatives écologiques.
          Le token $TTC n'est pas seulement un actif ; c'est une participation à un écosystème durable
          où chaque transaction contribue à un avenir plus vert.
        </p>

        {/* Grille pour les valeurs */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Valeur 1: Mission */}
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
            <Target className="text-green-400 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Notre Objectif</h3>
            <p className="text-gray-400">
              Financer des projets de reforestation et d'énergie renouvelable via la technologie blockchain.
            </p>
          </div>

          {/* Valeur 2: Valeurs */}
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
            <Gem className="text-green-400 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Nos Valeurs</h3>
            <p className="text-gray-400">
              Transparence, durabilité et innovation. Chaque détenteur de $TTC fait partie de la solution.
            </p>
          </div>

          {/* Valeur 3: Vision */}
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
            <Sprout className="text-green-400 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Notre Vision</h3>
            <p className="text-gray-400">
              Devenir le token de référence pour l'investissement à impact positif (Impact Investing) dans le Web3.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}


// --- COMPOSANT APP (Mis à jour) ---
// Il affiche maintenant les deux sections, l'une après l'autre
export default function App() {
  return (
    <ThirdwebProvider>
      <main>
        <Hero />
        <AboutSection />
      </main>
    </ThirdwebProvider>
  );
}
