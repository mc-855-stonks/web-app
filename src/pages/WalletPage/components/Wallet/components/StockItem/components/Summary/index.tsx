import { useAppSelector } from "hooks";
import React from "react";
import { selectHideValues } from "slices/settingsSlice";
import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  amount: number;
  avgPrice: number;
}

export default function Summary({ amount, avgPrice }: Props) {
  const hideValues = useAppSelector(selectHideValues);
  return (
    <div className={style.container}>
      <div className={style.item}>
        Quantidade
        <div className={style.value}>{hideValues ? "*****" : amount}</div>
      </div>
      <div className={style.item}>
        Preço de compra
        <div className={style.value}>
          R${hideValues ? "*****" : formatCurrency(avgPrice)}
        </div>
      </div>
    </div>
  );
}
