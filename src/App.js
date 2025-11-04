import React from "react";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, baseSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  RainbowKitProvider,
  getDefaultWallets,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import {
  ThirdwebProvider,
  useAddress,
  useContract,
  useTokenBalance,
} from "thirdweb/react";
import { ethers } from "ethers";
import "./App.css";

const { chains, provider } = configureChains(
  [baseSepolia, mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "The Canopy Club",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const TTC_CONTRACT = "0x0F91d4ae682F36e7F2275a0cf
