import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { mainnet, baseSepolia } from "wagmi/chains"; // CORRIGÉ ICI
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "The Canopy Club",
  projectId: "022f4d2b264c02a364fc9ff43079a707",
  chains: [mainnet, baseSepolia], // CORRIGÉ ICI
  transports: {
    [mainnet.id]: http(),
    [baseSepolia.id]: http(), // CORRIGÉ ICI
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
