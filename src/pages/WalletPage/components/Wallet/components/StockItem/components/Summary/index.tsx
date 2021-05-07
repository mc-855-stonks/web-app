import React from "react";
import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  amount: number;
  avgPrice: number;
}

export default function Summary({ amount, avgPrice }: Props) {
  return (
    <div className={style.container}>
      <div className={style.item}>
        Quantidade
        <div className={style.value}>{amount}</div>
      </div>
      <div className={style.item}>
        Preço de compra
        <div className={style.value}>R${formatCurrency(avgPrice)}</div>
      </div>
    </div>
  );
}
