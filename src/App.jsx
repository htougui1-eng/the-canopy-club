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
// Ajout des nouvelles icônes
import {
  Wallet, Target, Gem, Sprout, Coins, PieChart, ArrowRight,
  Database, Lock, Undo,
  Image, Store,
  BookOpen, Rocket // Icônes pour la section Whitepaper
} from "lucide-react";
import "./App.css";

const client = createThirdwebClient({
  clientId: "5a24a9d93adac32e424173823edafb05",
});

const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c";
const STAKING_CONTRACT = "0x12345678900000000000000000000000000StakE"; // Fictif
const OPENSEA_COLLECTION_URL = "https://opensea.io/collection/the-canopy-club1"; // 🚨 LIEN MIS À JOUR

// --- COMPOSANT HERO (Simplifié) ---
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
            <p className="text-gray-4
