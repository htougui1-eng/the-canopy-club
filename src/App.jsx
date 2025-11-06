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
  BookOpen, Rocket, ChevronLeft,
  Vote, Flame, ClipboardCopy, Map, HelpCircle, CheckCircle, PlusCircle
} from "lucide-react";
import "./App.css";

const client = createThirdwebClient({
  clientId: "8de3cb39806dd7770e0fa5f528e8d754",
});

const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c";
const OPENSEA_COLLECTION_URL = "https://opensea.io/collection/the-canopy-club1"; 
const NFT_CONTRACT_ADDRESS = "0x1234567890000000000000000000000000000NFT"; // Fictif
const DAO_CONTRACT_ADDRESS = "0x1234567890000000000000000000000000000DAO"; // Fictif


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
          <nav className="hidden md:flex space-x-4">
            <HashLink smooth to="/#about" className="text-gray-300 hover:text-green-400 transition-colors">
              À Propos
            </HashLink>
            <HashLink smooth to="/#tokenomics" className="text-gray-300 hover:text-green-400 transition-colors">
              Tokenomics
            </HashLink>
            <HashLink smooth to="/#roadmap" className="text-gray-300 hover:text-green-400 transition-colors">
              Roadmap
            </HashLink>
            <HashLink smooth to="/#nft" className="text-gray-300 hover:text-green-400 transition-colors">
              NFT
            </HashLink>
            <HashLink smooth to="/#faq" className="text-gray-300 hover:text-green-400 transition-colors">
              FAQ
            </HashLink>
            <Link to="/dao" className="text-gray-300 hover:text-green-400 transition-colors">
              DAO
            </Link>
            <Link to="/burn" className="text-gray-300 hover:text-green-400 transition-colors">
              Burn
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

function PresaleModule() {
  return (
    <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-2xl border border-green-400/30">
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
  );
}

function Hero({ address, isLoading, balanceData, symbolData }) {
  return (
    <div id="hero" className="min-h-screen bg-slate-900 text-white flex items-center p-8 pt-24">
      <div className="container mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
        
        <div className="text-center md:text-left">
          <h1 className="text-6xl font-bold text-green-400 mb-4">
            The Canopy Club 🌿
          </h1>
          <h2 className="text-2xl text-gray-300 mb-10">
            Votre token pour un futur plus vert et technologique.
          </h2>

          {address && (
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mt-8 max-w-md mx-auto md:mx-0">
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

        <div className="flex justify-center">
          <PresaleModule />
        </div>
        
      </div>
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
            <span className="ml-auto text-lg text-green-400">10 Milliards TTC</span>
          </div>
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Coins className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Prévente :</span>
            <span className="ml-auto text-lg">50% (5 Milliards TTC)</span>
          </div>
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Image className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">NFT Holders :</span>
            <span className="ml-auto text-lg">20% (2 Milliards TTC)</span>
          </div>
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Sprout className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Marketing / Communauté :</span>
            <span className="ml-auto text-lg">10% (1 Milliard TTC)</span>
          </div>
          <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Gem className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Équipe :</span>
            <span className="ml-auto text-lg">5% (500 Millions TTC)</span>
          </div>
           <div className="flex items-center bg-slate-800 p-4 rounded-lg">
            <Lock className="text-green-400 h-6 w-6 mr-4 flex-shrink-0" />
            <span className="font-bold text-lg">Réserve / Trésorerie / Liquidité :</span>
            <span className="ml-auto text-lg">15% (1.5 Milliards TTC)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TokenDetailsSection({ symbol }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(TTC_CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="details" className="bg-slate-950 text-white py-20 px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Détails du Token <span className="text-green-400">${symbol}</span>
        </h2>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Nom du Token :</span>
            <span className="font-bold">The Canopy Club</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Symbole :</span>
            <span className="font-bold">{symbol}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Supply Totale :</span>
            <span className="font-bold">10,000,000,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Réseau :</span>
            <span className="font-bold">Base Sepolia (Testnet)</span>
          </div>
          <div className="pt-4 border-t border-slate-700">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adresse du Contrat Smart Contract
            </label>
            <div className="flex space-x-2">
              <input 
                type="text" 
                readOnly 
                value={TTC_CONTRACT}
                className="w-full p-2 rounded-md bg-slate-900 border border-slate-700 text-gray-400 text-sm"
              />
              <button 
                onClick={copyToClipboard}
                className="p-2 bg-slate-700 rounded-md text-sm font-bold hover:bg-slate-600"
              >
                {copied ? <CheckCircle className="text-green-400" /> : <ClipboardCopy />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  const phases = [
    { title: "Phase 1 : Lancement", description: "Lancement du token $TTC, prévente, et déploiement de la collection NFT V1." },
    { title: "Phase 2 : Utilité", description: "Déploiement du contrat de Staking, premiers votes de la DAO, partenariats écologiques." },
    { title: "Phase 3 : Expansion", description: "Lancement du jeu 'Play-to-Earn' (P2E), expansion de la DAO, et listing sur CEX." },
    { title: "Phase 4 : Écosystème Global", description: "Intégration cross-chain et financement de projets à grande échelle." },
  ];

  return (
    <section id="roadmap" className="bg-slate-900 text-white py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Notre <span className="text-green-400">Roadmap</span>
        </h2>
        <div className="relative border-l-2 border-green-400/30 ml-6">
          {phases.map((phase, index) => (
            <div key={index} className="mb-10 ml-10">
              <span className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-green-500 rounded-full ring-8 ring-slate-900">
                <Map className="w-4 h-4 text-slate-900" />
              </span>
              <h3 className="text-2xl font-semibold text-green-400 mb-1">{phase.title}</h3>
              <p className="text-gray-400">{phase.description}</p>
            </div>
          ))}
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
    <section id="nft" className="bg-slate-950 text-white py-20 px-8">
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

function FaqSection() {
  const faqs = [
    { q: "Qu'est-ce que The Canopy Club ($TTC) ?", a: "C'est un token Web3 conçu pour financer des projets écologiques. Chaque détenteur de $TTC et de NFT participe à la gouvernance de ces projets." },
    { q: "Comment puis-je acheter des tokens $TTC ?", a: "Pendant la phase actuelle, vous pouvez acheter des tokens $TTC via notre module de prévente en utilisant des ETH sur le réseau Base Sepolia." },
    { q: "À quoi servent les NFT ?", a: "Les NFT sont votre clé de gouvernance. Ils vous donnent le droit de voter sur les propositions de projet dans notre DAO." },
  ];

  return (
    <section id="faq" className="bg-slate-900 text-white py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Questions <span className="text-green-400">Fréquentes (FAQ)</span>
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" /> {faq.q}
              </h3>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
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
  
  const isLoading = isBalanceLoading || isSymbolLoading;

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
      <TokenDetailsSection symbol={symbolData} />
      <RoadmapSection />
      <NftSection />
      <FaqSection />
      <WhitepaperSection />
    </main>
  );
}

function DetailsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
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
          <h2>Roadmap Détaillée</h2>
          <ul>
            <li>Phase 1 : Lancement du token $TTC et de la collection NFT.</li>
            <li>Phase 2 : Déploiement du contrat de Staking et partenariats écologiques.</li>
            <li>Phase 3 : Lancement de la plateforme de vote (DAO).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DaoPage() {
  const { address } = useAccount();
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDesc, setProposalDesc] = useState("");

  const isNftBalanceLoading = false;
  const hasNft = true; // Simulation: Changez "true" à "false" pour tester

  const proposals = [
    { id: 1, title: "Projet A : Financer la reforestation en Amazonie", description: "Allouer 10 ETH du fonds écologique." },
    { id: 2, title: "Projet B : Partenariat avec 'SolarTech'", description: "Investir dans une nouvelle technologie de panneaux solaires." },
    { id: 3, title: "Projet C : Campagne Marketing", description: "Augmenter le budget marketing de 5 ETH pour le Q1." },
    { id: 4, title: "Projet D : Audit de Sécurité du Contrat de Staking", description: "Allouer 1 ETH pour un audit par 'CertiK'." },
  ];

  if (isNftBalanceLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <p>Vérification de votre statut de détenteur NFT...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Retour à l'accueil
        </Link>
        <h1 className="text-5xl font-bold mb-6">Gouvernance (DAO)</h1>
        
        {!address ? (
          <p className="text-lg text-gray-400">Veuillez connecter votre wallet pour participer.</p>
        ) : hasNft ? (
          <div className="space-y-8">
            <p className="text-lg text-green-400">Statut : Déteneur de NFT vérifié. Vous pouvez voter et soumettre des propositions.</p>
            
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <PlusCircle className="h-6 w-6 mr-2 text-green-400" />
                Soumettre une Nouvelle Proposition
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Titre de la Proposition</label>
                  <input 
                    type="text" 
                    id="title"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="w-full p-3 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Ex: Financer le Projet X"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea 
                    id="description"
                    rows={4}
                    value={proposalDesc}
                    onChange={(e) => setProposalDesc(e.target.value)}
                    className="w-full p-3 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Expliquez votre proposition en détail..."
                  />
                </div>
                <button
                  onClick={() => alert("Simulation : Soumission de la proposition...")}
                  className="w-full bg-green-500 text-slate-900 font-bold py-2 px-4 rounded-lg hover:bg-green-400"
                >
                  Soumettre la Proposition (Simulation)
                </button>
              </div>
            </div>
            
            <hr className="border-slate-700" />

            <h2 className="text-3xl font-bold">Propositions Actuelles</h2>
            {proposals.map((proposal) => (
              <div key={proposal.id} className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-2">{proposal.title}</h3>
                <p className="text-gray-400 mb-4">{proposal.description}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => alert("Simulation : Vote 'Pour' enregistré.")}
                    className="bg-green-500 text-slate-900 font-bold py-2 px-4 rounded-lg hover:bg-green-400"
                  >
                    Voter Pour (Simulation)
                  </button>
                  <button
                    onClick={() => alert("Simulation : Vote 'Contre' enregistré.")}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-400"
                  >
                    Voter Contre (Simulation)
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-red-500">
            Vous devez détenir un NFT "The Canopy Club" pour pouvoir voter.
          </p>
        )}
      </div>
    </div>
  );
}

function BurnPage() {
  const [tokensToBurn, setTokensToBurn] = useState(0);

  const calculateBurn = () => {
    const weeklyVolume = 1000000;
    const burnRate = 0.001; 
    setTokensToBurn(weeklyVolume * burnRate);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Retour à l'accueil
        </Link>
        <h1 className="text-5xl font-bold mb-6">Mécanisme de Burn $TTC</h1>
        <div className="bg-slate-800 p-8 rounded-lg text-center">
          <Flame className="text-red-500 h-16 w-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Calculateur de Burn Hebdomadaire</h2>
          <p className="text-gray-400 mb-6">
            Chaque semaine, un pourcentage des frais de transaction est brûlé pour réduire l'offre et augmenter la rareté.
          </p>
          <button 
            onClick={calculateBurn}
            className="bg-green-500 text-slate-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-400 transition-all duration-300"
          >
            Calculer le Burn de cette semaine
          </button>
          {tokensToBurn > 0 && (
            <div className="mt-8">
              <p className="text-lg text-gray-300">Tokens à brûler cette semaine :</p>
              <p className="text-4xl font-bold text-red-500">{tokensToBurn.toLocaleString()} TTC</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThirdwebProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProjectPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/dao" element={<DaoPage />} />
        <Route path="/burn" element={<BurnPage />} />
      </Routes>
    </ThirdwebProvider>
  );
}
