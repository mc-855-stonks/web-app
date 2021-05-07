import React from "react";
import classnames from "classnames";

import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  boughtAmount: number;
  currentTotal: number;
}

export default function Results({ boughtAmount, currentTotal }: Props) {
  const totalYield = currentTotal - boughtAmount;
  const yieldPercentage = totalYield / (boughtAmount / 100);

  return (
    <div className={style.container}>
      <div className={style.block}>
        <div className={style["block-title"]}>Total de Compra</div>
        <div className={style.amount}>R${formatCurrency(boughtAmount)}</div>
      </div>
      <div className={style.separator} />
      <div className={style.block}>
        <div className={style["block-title"]}>Total Atual</div>
        <div className={style.amount}>R${formatCurrency(currentTotal)}</div>
      </div>
      <div className={style.separator} />
      <div className={style.block}>
        <div className={style["block-title"]}>Rendimento Total</div>
        <div className={style["yield-container"]}>
          <div className={style.amount}>R${formatCurrency(totalYield)}</div>
          {yieldPercentage >= 0 && (
            <div className={classnames(style.yield, style["positive-yield"])}>
              (+{formatCurrency(yieldPercentage)}%)
            </div>
          )}
          {yieldPercentage < 0 && (
            <div className={classnames(style.yield, style["negative-yield"])}>
              ({formatCurrency(yieldPercentage)}%)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
