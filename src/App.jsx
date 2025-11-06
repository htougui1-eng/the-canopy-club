import React, { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  ThirdwebProvider,
  useReadContract,
  TransactionButton,
} from "thirdweb/react";
import {
  getContract,
  createThirdwebClient,
  prepareContractCall,
  toWei,
} from "thirdweb";
import { toEther } from "thirdweb/utils";
import {
  Wallet, Target, Gem, Sprout, Coins, PieChart, ArrowRight,
  Database, Lock, Undo,
  Image, Store,
  BookOpen, Rocket
} from "lucide-react";
import "./App.css";

const client = createThirdwebClient({
  clientId: "5a24a9d93adac32e424173823edafb05",
});

const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c";
const STAKING_CONTRACT = "0x12345678900000000000000000000000000StakE"; 
const OPENSEA_COLLECTION_URL = "https://opensea.io/collection/the-canopy-club1"; 

function Hero({ address, isLoading, balanceData, symbolData }) {
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

function AboutSection() {
  return (
    <section className="bg-slate-950 text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          À Propos de <span className="text-green-400">The Canopy Club</span>
        </h2>
        <p className="text-lg text-gray-400 mb-12">
          Notre mission est de fusionner la finance décentralisée avec des initiatives écologiques.
          Le token $TTC n'est pas seulement un actif ; c'est une participation à un écosystème durable
          où chaque transaction contribue à un avenir plus vert.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
            <Target className="text-green-400 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Notre Objectif</h3>
            <p className="text-gray-400">
              Financer des projets de reforestation et d'énergie renouvelable via la technologie blockchain.
            </p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
            <Gem className="text-green-400 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Nos Valeurs</h3>
            <p className="text-gray-400">
              Transparence, durabilité et innovation. Chaque détenteur de $TTC fait partie de la solution.
            </p>
          </div>
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

function TokenomicsSection() {
  return (
    <section className="bg-slate-900 text-white py-20 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6">
            Tokenomics <span className="text-green-400">$TTC</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Une économie équilibrée conçue pour la croissance à long terme et le financement de nos projets écologiques.
          </p>
          <div className="space-y-4">
            <div className="flex items-center bg-slate-800 p-4 rounded-lg">
              <PieChart className="text-green-400 h-6 w-6 mr-4" />
              <span><span className="font-bold">Supply Totale :</span> 100,000,000 TTC</span>
            </div>
            <div className="flex items-center bg-slate-800 p-4 rounded-lg">
              <Coins className="text-green-400 h-6 w-6 mr-4" />
              <span><span className="font-bold">Prévente :</span> 40% (40,000,000 TTC)</span>
            </div>
            <div className="flex items-center bg-slate-800 p-4 rounded-lg">
              <Sprout className="text-green-400 h-6 w-6 mr-4" />
              <span><span className="font-bold">Fonds Écologique :</span> 30% (30,000,000 TTC)</span>
            </div>
            <div className="flex items-center bg-slate-800 p-4 rounded-lg">
              <Gem className="text-green-400 h-6 w-6 mr-4" />
              <span><span className="font-bold">Liquidité & Staking :</span> 30% (30,000,000 TTC)</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-8 rounded-lg shadow-2xl border border-green-400/30">
          <h3 className="text-3xl font-bold text-center mb-6 text-green-400">
            Participer à la Prévente
          </h3>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="ethAmount" className="block text-sm font-medium text-gray-300 mb-1">
                Montant en ETH (Base Sepolia)
              </label>
              <input 
                type="number" 
                id="ethAmount"
                placeholder="0.1" 
                className="w-full p-3 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label htmlFor="ttcAmount" className="block text-sm font-medium text-gray-300 mb-1">
                Vous recevrez (TTC)
              </label>
              <input 
                type="number" 
                id="ttcAmount"
                placeholder="1000" 
                disabled 
                className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
          <button className="w-full bg-green-500 text-slate-900 font-bold py-3 rounded-lg text-lg hover:bg-green-400 transition-all duration-300 flex items-center justify-center space-x-2">
            <span>Acheter $TTC</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-center text-gray-400 text-xs mt-4">
            Ceci est une simulation. Taux : 1 ETH = 10,000 TTC
          </p>
        </div>
      </div>
    </section>
  );
}

function StakingSection({ address, isLoading: isAppLoading, ttcBalance, symbol, ttcContract, stakingContract }) {
  const [activeTab, setActiveTab] = useState("stake"); 
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const stakedBalanceData = null; 
  const isStakedBalanceLoading = false; 

  const stakedBalance = stakedBalanceData ? toEther(stakedBalanceData) : "0";
  const walletBalance = ttcBalance ? toEther(ttcBalance) : "0";

  const isLoading = isAppLoading || isStakedBalanceLoading;

  return (
    <section className="bg-slate-950 text-white py-20 px-8">
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Staking <span className="text-green-400">$TTC</span>
        </h2>
        {isLoading ? (
          <p className="text-center">Chargement du module de Staking...</p>
        ) : (
          <>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8 text-center">
              <Lock className="text-green-400 h-10 w-10 mx-auto mb-3" />
              <h3 className="text-lg text-gray-400">Votre Solde Staké</h3>
              <p className="text-3xl font-bold text-green-400">
                {stakedBalance} {symbol}
              </p>
            </div>
            <div className="bg-slate-900 p-8 rounded-lg shadow-2xl">
              <div className="flex mb-6 border-b border-slate-700">
                <button
                  onClick={() => setActiveTab("stake")}
                  className={`py-3 px-6 text-lg font-semibold ${
                    activeTab === "stake"
                      ? "border-b-2 border-green-400 text-green-400"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <Database className="h-5 w-5 inline mr-2" />
                  Stake
                </button>
                <button
                  onClick={() => setActiveTab("unstake")}
                  className={`py-3 px-6 text-lg font-semibold ${
                    activeTab === "unstake"
                      ? "border-b-2 border-green-400 text-green-400"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <Undo className="h-5 w-5 inline mr-2" />
                  Unstake
                </button>
              </div>
              {activeTab === "stake" && (
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor="stakeAmount" className="block text-sm font-medium text-gray-300">
                      Montant à Staker
                    </label>
                    <span className="text-xs text-gray-400">
                      Solde: {walletBalance} {symbol}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      id="stakeAmount"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0" 
                      className="flex-grow p-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button 
                      onClick={() => setStakeAmount(walletBalance)}
                      className="px-4 py-2 bg-slate-700 rounded-md text-sm font-bold hover:bg-slate-600"
                    >
                      Max
                    </button>
                  </div>
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: stakingContract,
                        method: "stake", 
                        params: [toWei(stakeAmount || "0")], 
                      })
                    }
                    onTransactionSent={() => console.log("Transaction envoyée...")}
                    onTransactionConfirmed={() => {
                      console.log("Staking réussi !");
                      setStakeAmount("");
                    }}
                    className="!w-full !bg-green-500 !text-slate-900 !font-bold !py-3 !rounded-lg !text-lg !mt-6 !hover:bg-green-400 !transition-all !duration-300"
                  >
                    Staker {stakeAmount || 0} {symbol}
                  </TransactionButton>
                </div>
              )}
              {activeTab === "unstake" && (
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor="unstakeAmount" className="block text-sm font-medium text-gray-300">
                      Montant à "Unstake"
                    </label>
                    <span className="text-xs text-gray-400">
                      Staké: {stakedBalance} {symbol}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      id="unstakeAmount"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      placeholder="0" 
                      className="flex-grow p-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button 
                      onClick={() => setUnstakeAmount(stakedBalance)}
                      className="px-4 py-2 bg-slate-700 rounded-md text-sm font-bold hover:bg-slate-600"
                    >
                      Max
                    </button>
                  </div>
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: stakingContract,
                        method: "unstake", 
                        params: [toWei(unstakeAmount || "0")],
                      })
                    }
                    onTransactionSent={() => console.log("Transaction envoyée...")}
                    onTransactionConfirmed={() => {
                      console.log("Unstake réussi !");
                      setUnstakeAmount("");
                    }}
                    className="!w-full !bg-gray-500 !text-white !font-bold !py-3 !rounded-lg !text-lg !mt-6 !hover:bg-gray-400 !transition-all !duration-300"
                  >
                    Unstake {unstakeAmount || 0} {symbol}
                  </TransactionButton>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function NftSection() {
  const nftPreviews = [
    { id: 1, name: "Canopy Sloth #001", description: "Un paresseux rare avec une fourrure dorée." },
    { id: 2, name: "Forest Guardian #007", description: "Le protecteur de la canopée numérique." },
    { id: 3, name: "Eco-Drone #042", description: "Un drone high-tech surveillant la reforestation." },
  ];

  return (
    <section className="bg-slate-900 text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Collection <span className="text-green-400">NFT</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Nos NFT ne sont pas de simples images. Ce sont des clés d'accès à des avantages exclusifs au sein 
            de l'écosystème The Canopy Club.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {nftPreviews.map((nft) => (
            <div key={nft.id} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-green-400/20 hover:scale-105">
              <div className="h-60 bg-slate-700 flex items-center justify-center">
                <Image className="text-gray-500 h-24 w-24" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{nft.name}</h3>
                <p className="text-gray-400">{nft.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={OPENSEA_COLLECTION_URL} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-green-500 text-slate-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-400 transition-all duration-300"
          >
            <Store className="h-5 w-5" />
            <span>Voir la collection sur OpenSea</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function WhitepaperSection() {
  return (
    <section className="bg-slate-950 text-white py-24 px-8">
      <div className="max-w-3xl mx-auto text-center">
        <Rocket className="text-green-400 h-16 w-16 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">
          Prêt à plonger plus loin ?
        </h2>
        <p className="text-lg text-gray-400 mb-10">
          Notre whitepaper contient tous les détails techniques, la feuille de route (roadmap) et la vision complète 
          de l'écosystème The Canopy Club.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/whitepaper.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-green-500 text-slate-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-400 transition-all duration-300"
          >
            <BookOpen className="h-5 w-5" />
            <span>Lire le Whitepaper</span>
          </a>
          <a
            href="/details" 
            className="inline-flex items-center justify-center space-x-2 bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-600 transition-all duration-300"
          >
            <span>En savoir plus</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}


function ProjectPage() {
  const { address } = useAccount();

  const ttcContract = useMemo(() => {
    return getContract({ client, chain: baseSepolia, address: TTC_CONTRACT });
  }, [client]);

  const stakingContract = useMemo(() => {
    return getContract({ client, chain: baseSepolia, address: STAKING_CONTRACT });
  }, [client]);

  const { data: balanceData, isLoading: isBalanceLoading } = useReadContract({
    contract: ttcContract,
    method: "balanceOf",
    params: [address || ""],
  });

  const { data: symbolData, isLoading: isSymbolLoading } = useReadContract({
    contract: ttcContract,
    method: "symbol",
    params: [],
  });
  
  const stakedBalanceData = null;
  const isStakedLoading = false;

  const isLoading = isBalanceLoading || isSymbolLoading || isStakedLoading;

  return (
    <main>
      <Hero 
        address={address}
        isLoading={isLoading}
        balanceData={balanceData}
        symbolData={symbolData}
      />
      <AboutSection />
      <TokenomicsSection />
      {/*
      <StakingSection 
        address={address}
        isLoading={isLoading}
        ttcBalance={balanceData}
        stakedBalance={stakedBalanceData}
        symbol={symbolData}
        ttcContract={ttcContract}
        stakingContract={stakingContract}
      />
      */}
      <NftSection />
      <WhitepaperSection />
    </main>
  );
}

export default function App() {
  return (
    <ThirdwebProvider>
      <ProjectPage />
    </ThirdwebProvider>
  );
}
