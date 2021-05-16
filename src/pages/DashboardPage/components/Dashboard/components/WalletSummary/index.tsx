import React from "react";
import classNames from "classnames";
import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  totalWealth: number;
  totalYield: number;
  sharpe: number;
  volatility: number;
  alfa: number;
  beta: number;
}

export default function WalletSummary({
  totalWealth,
  totalYield,
  sharpe,
  volatility,
  alfa,
  beta,
}: Props) {
  function yieldPercentage(): string {
    const percentage = totalWealth > 0 ? totalYield / (totalWealth / 100) : 0;
    if (percentage > 0) {
      return `+${formatCurrency(percentage)}`;
    }
    return formatCurrency(percentage);
  }

  return (
    <div className={style.container}>
      <div className={style.card} style={{ marginRight: 17 }}>
        <div className={style.column}>
          <div className={style["summary-title"]}>Patrimônio Total</div>
          <div className={style["summary-content"]}>
            R${formatCurrency(totalWealth)}
          </div>
        </div>
        <div className={style.separator} />
        <div className={style.column}>
          <div className={style["summary-title"]}>Rendimento</div>
          <div
            className={classNames([
              style["summary-content"],
              {
                [style["positive-yield"]]: totalYield >= 0,
                [style["negative-yield"]]: totalYield < 0,
              },
            ])}
          >
            R${formatCurrency(totalYield)}
            <div className={style["yield-percentage"]}>
              ({yieldPercentage()}%)
            </div>
          </div>
        </div>
      </div>
      <div className={style.card}>
        <div className={style.column}>
          <div className={style["indicator-title"]}>Volatilidate</div>
          <div className={style["indicator-value"]}>
            {formatCurrency(volatility)}%
          </div>
        </div>
        <div className={style.separator} />
        <div className={style.column}>
          <div className={style["indicator-title"]}>Sharpe</div>
          <div className={style["indicator-value"]}>
            {formatCurrency(sharpe)}
          </div>
        </div>
        <div className={style.separator} />
        <div className={style.column}>
          <div className={style["indicator-title"]}>Alfa</div>
          <div className={style["indicator-value"]}>{formatCurrency(alfa)}</div>
        </div>
        <div className={style.separator} />
        <div className={style.column}>
          <div className={style["indicator-title"]}>Beta</div>
          <div className={style["indicator-value"]}>{formatCurrency(beta)}</div>
        </div>
      </div>
    </div>
  );
}
