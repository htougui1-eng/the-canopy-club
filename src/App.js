import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>The Canopy Club 🌿</h1>
      <ConnectButton />
      <p>Token Symbol: TTC</p>
      <p>Contract: 0x0F91d4ae682F36e7F2275a0cfF68eB176b085A3c</p>
    </div>
  );
}
