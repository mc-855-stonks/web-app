import { useAppSelector } from "hooks";
import React from "react";
import { selectHideValues } from "slices/settingsSlice";
import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  buyPosition: number;
  currentPosition: number;
}

export default function Position({ buyPosition, currentPosition }: Props) {
  const hideValues = useAppSelector(selectHideValues);
  return (
    <div className={style.container}>
      <div className={style.position}>
        Total de Compra
        <div className={style["position-amount"]}>
          R${hideValues ? "*****" : formatCurrency(buyPosition)}
        </div>
      </div>
      <div className={style.position}>
        Total Atual
        <div className={style["position-amount"]}>
          R${hideValues ? "*****" : formatCurrency(currentPosition)}
        </div>
      </div>
    </div>
  );
}
