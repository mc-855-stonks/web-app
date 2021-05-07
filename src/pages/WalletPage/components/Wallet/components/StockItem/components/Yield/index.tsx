import React from "react";
import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  totalYield: number;
  yieldPercentage: number;
}

export default function Yield({ totalYield, yieldPercentage }: Props) {
  return (
    <div className={style.container}>
      Rendimento da ação
      <div className={style.yield}>
        R${formatCurrency(totalYield)}{" "}
        {yieldPercentage >= 0 ? (
          <div className={style["positive-yield"]}>
            (+{formatCurrency(yieldPercentage)}%)
          </div>
        ) : (
          <div className={style["negative-yield"]}>
            ({formatCurrency(yieldPercentage)}%)
          </div>
        )}
      </div>
    </div>
  );
}
