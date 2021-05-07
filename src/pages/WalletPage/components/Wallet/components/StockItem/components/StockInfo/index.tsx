import React from "react";

import style from "./style.module.css";

interface Props {
  ticker: string;
  name: string;
  percentage: number;
}

export default function StockInfo({ ticker, name, percentage }: Props) {
  return (
    <div className={style.container}>
      <h3 className={style.ticker}>{ticker}</h3>
      <span className={style.name}>{name}</span>
      <div className={style["percentage-bar-background"]}>
        <div className={style["percentage-bar"]} style={{ width: 10 }} />
      </div>
      <div className={style["wallet-percentage"]}>
        <b>{percentage}%</b> da sua carteira
      </div>
    </div>
  );
}
