import React from "react";
import classNames from "classnames";
import { useAppSelector } from "hooks";
import { selectHideValues } from "slices/settingsSlice";
import { selectPerformance } from "slices/performanceSlice";
import { formatCurrency } from "utils/formatters";
import { selectDailyReturn } from "slices/monthlyIncomeSlice";
import { selectWallet } from "slices/walletSlice";

import style from "./style.module.css";

export default function WalletSummary() {
  const { alpha, beta, sharpe, volatility } = useAppSelector(selectPerformance);
  const returns = useAppSelector(selectDailyReturn);
  const hideValues = useAppSelector(selectHideValues);
  const wallet = useAppSelector(selectWallet);
  const totalWealth = wallet ? wallet.wallet_total : 0;

  function yieldPercentage(): string {
    const percentage = totalWealth > 0 ? returns / (totalWealth / 100) : 0;
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
            R${hideValues ? "*****" : formatCurrency(totalWealth)}
          </div>
        </div>
        <div className={style.separator} />
        <div className={style.column}>
          <div className={style["summary-title"]}>Rendimento (24h)</div>
          <div
            className={classNames([
              style["summary-content"],
              {
                [style["positive-yield"]]: returns >= 0,
                [style["negative-yield"]]: returns < 0,
              },
            ])}
          >
            R${hideValues ? "*****" : formatCurrency(returns)}
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
          <div className={style["indicator-value"]}>
            {formatCurrency(alpha)}
          </div>
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
