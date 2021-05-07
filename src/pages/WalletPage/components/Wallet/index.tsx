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
      <StockItem />
      <StockItem />
      <StockItem />
    </div>
  );
}
