import React from "react";
import WalletSummary from "./components/WalletSummary";
import Portfolio from "./components/Portfolio";
import Performance from "./components/Performance";
import style from "./style.module.css";

export default function Dashboard() {
  return (
    <div className={style.container}>
      <WalletSummary />
      <Portfolio />
      <Performance />
    </div>
  );
}
