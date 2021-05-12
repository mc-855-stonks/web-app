import React from "react";

import Subtitle from "components/Subtitle";

import Results from "./components/Results";
import StockItem from "./components/StockItem";

import style from "./style.module.css";

export default function Wallet() {
  return (
    <div className={style.container}>
      <Subtitle>Rendimento Total</Subtitle>
      <Results boughtAmount={3873.12} currentTotal={6000} />
      <Subtitle
        style={{
          marginTop: 43,
        }}
      >
        Ações
      </Subtitle>
      <StockItem
        ticker="CSNA3"
        name="CIA SIDERURGICA NACIONAL"
        walletPercentage={15}
        totalYield={4.18}
        yieldPercentage={0.36}
        lastPrice={30.55}
        buyPosition={1156.72}
        currentPosition={1160.9}
        amount={38}
        averagePrice={30.44}
      />
      <StockItem
        ticker="CSNA3"
        name="CIA SIDERURGICA NACIONAL"
        walletPercentage={15}
        totalYield={4.18}
        yieldPercentage={0.36}
        lastPrice={30.55}
        buyPosition={1156.72}
        currentPosition={1160.9}
        amount={38}
        averagePrice={30.44}
      />{" "}
      <StockItem
        ticker="CSNA3"
        name="CIA SIDERURGICA NACIONAL"
        walletPercentage={15}
        totalYield={4.18}
        yieldPercentage={0.36}
        lastPrice={30.55}
        buyPosition={1156.72}
        currentPosition={1160.9}
        amount={38}
        averagePrice={30.44}
      />
    </div>
  );
}
