import React from "react";
import WalletSummary from "./components/WalletSummary";

import style from "./style.module.css";

export default function Dashboard() {
  return (
    <div className={style.container}>
      <WalletSummary
        totalWealth={20005.64}
        totalYield={1353.69}
        volatility={10.3}
        sharpe={1.03}
        alfa={0.98}
        beta={1.2}
      />
    </div>
  );
}
