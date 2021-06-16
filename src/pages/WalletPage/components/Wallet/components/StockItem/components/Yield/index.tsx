import { useAppSelector } from "hooks";
import React from "react";
import { selectHideValues } from "slices/settingsSlice";
import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  totalYield: number;
  yieldPercentage: number;
}

export default function Yield({ totalYield, yieldPercentage }: Props) {
  const hideValues = useAppSelector(selectHideValues);
  return (
    <div className={style.container}>
      Rendimento da ação
      <div className={style.yield}>
        R${hideValues ? "*****" : formatCurrency(totalYield)}{" "}
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
