import React from "react";
import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  price: number;
}

export default function LastPrice({ price }: Props) {
  return (
    <div className={style.container}>
      Valor atual <div className={style.price}>R${formatCurrency(price)}</div>
    </div>
  );
}
