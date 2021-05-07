import React from "react";
import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  buyPosition: number;
  currentPosition: number;
}

export default function Position({ buyPosition, currentPosition }: Props) {
  return (
    <div className={style.container}>
      <div className={style.position}>
        Total de Compra
        <div className={style["position-amount"]}>
          R${formatCurrency(buyPosition)}
        </div>
      </div>
      <div className={style.position}>
        Total Atual
        <div className={style["position-amount"]}>
          R${formatCurrency(currentPosition)}
        </div>
      </div>
    </div>
  );
}
