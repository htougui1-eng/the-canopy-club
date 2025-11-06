import React, { useMemo, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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
  BookOpen, Rocket, ChevronLeft
} from "lucide-react";
import "./App.css";

const client = createThirdwebClient({
  clientId: "8de3cb39806dd7770e0fa5f528e8d754",
});

const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c";
const STAKING_CONTRACT = "0x12345678900000000000000000000000000StakE"; 
const OPENSEA_COLLECTION_URL = "https://opensea.io/collection/the-canopy-club1"; 


function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <HashLink to="/#hero" className="text-2xl font-bold text-green-400">
              The Canopy Club 🌿
            </HashLink>
          </div>
          <nav className="hidden md:flex space-x-6">
            <HashLink smooth to="/#about" className="text-gray-300 hover:text-green-400 transition-colors">
              À Propos
            </HashLink>
            <HashLink smooth to="/#tokenomics" className="text-gray-300 hover:text-green-400 transition-colors">
              Tokenomics
            </HashLink>
            <HashLink smooth to="/#presale" className="text-gray-300 hover:text-green-400 transition-colors">
              Prévente
            </HashLink>
            <HashLink smooth to="/#nft" className="text-gray-300 hover:text-green-400 transition-colors">
              NFT
            </HashLink>
            <Link to="/details" className="text-gray-300 hover:text-green-400 transition-colors">
              En savoir plus
            </Link>
          </nav>
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ address, isLoading, balanceData, symbolData }) {
  return (
    <div id="hero" className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-green-400 mb-4 mt-16">
        The Canopy Club 🌿
      </h1>
      <h2 className="text-2xl text-gray-300 mb-10">
        Votre token pour un futur plus vert et technologique.
      </h2>

      {address && (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mt-8">
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
        <p className="text-gray-500 mt-8">
          Connectez votre wallet pour voir votre solde TTC.
        </p>
      )}
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-slate-950 text-white py-20 px-8">
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
    <section id="tokenomics" className="bg-slate-900 text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Tokenomics <span className="text-green-400">$TTC</span>
        </h2>
        <p className="text-lg text-gray-400 mb-12">
          Une économie équilibrée de 10 Milliards de tokens conçue pour la croissance à long terme et le soutien de la communauté.
        </p>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <PieChart className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Supply Totale :</span>
            <span className="ml-auto text-lg text-green-400">10,000,000,000 TTC</span>
          </div>
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Coins className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Prévente :</span>
            <span className="ml-auto text-lg">50% (5,000,000,000 TTC)</span>
          </div>
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Image className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">NFT Holders :</span>
            <span className="ml-auto text-lg">20% (2,000,000,000 TTC)</span>
          </div>
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Sprout className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Marketing / Communauté :</span>
            <span className="ml-auto text-lg">10% (1,000,000,000 TTC)</span>
          </div>
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Gem className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Équipe :</span>
            <span className="ml-auto text-lg">5% (500,000,000 TTC)</span>
          </div>
           <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Lock className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Réserve / Trésorerie / Liquidité :</span>
            <span className="ml-auto text-lg">15% (1,500,000,000 TTC)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PresaleSection() {
  return (
    <section id="presale" className="bg-slate-950 text-white py-20 px-8">
      <div className="max-w-xl mx-auto">
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

function NftSection() {
  const nftPreviews = [
    { id: 1, name: "Canopy Sloth #001", description: "Un paresseux rare avec une fourrure dorée." },
    { id: 2, name: "Forest Guardian #007", description: "Le protecteur de la canopée numérique." },
    { id: 3, name: "Eco-Drone #042", description: "Un drone high-tech surveillant la reforestation." },
  ];

  return (
    <section id="nft" className="bg-slate-900 text-white py-20 px-8">
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
          <Link
            to="/details" 
            className="inline-flex items-center justify-center space-x-2 bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-600 transition-all duration-300"
          >
            <span>En savoir plus</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
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
      <PresaleSection />
      <NftSection />
      <WhitepaperSection />
    </main>
  );
}

function DetailsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Retour à l'accueil
        </Link>
        <h1 className="text-5xl font-bold mb-6">Détails du Projet</h1>
        <div className="prose prose-invert prose-lg text-gray-300">
          <p>
            C'est ici que vous placerez tous les détails supplémentaires de votre projet.
          </p>
          <p>
            Vous pouvez développer en profondeur votre mission, expliquer la technologie derrière
            le staking, ou présenter en détail la roadmap de "The Canopy Club".
          </p>
          <h2>
