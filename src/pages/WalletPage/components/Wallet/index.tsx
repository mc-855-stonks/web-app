import React from "react";
import { useAppSelector } from "hooks";

import Subtitle from "components/Subtitle";
import { selectWallet } from "slices/walletSlice";

import Results from "./components/Results";
import StockItem from "./components/StockItem";

import style from "./style.module.css";

export default function Wallet() {
  const wallet = useAppSelector(selectWallet);
  if (!wallet) {
    return null;
  }

  return (
    <div className={style.container}>
      <Subtitle>Rendimento Total</Subtitle>
      <Results
        boughtAmount={wallet.total_invested}
        currentTotal={wallet.wallet_total}
      />
      <Subtitle
        style={{
          marginTop: 43,
        }}
      >
        Ações
      </Subtitle>
      {wallet.stocks.map((stock) => (
        <StockItem
          key={stock.ticker}
          ticker={stock.ticker}
          name={stock.company_name}
          walletPercentage={stock.proportion * 100}
          totalYield={stock.curr_return}
          yieldPercentage={stock.curr_return_percent}
          lastPrice={stock.current_price}
          buyPosition={stock.invested_value}
          currentPosition={stock.current_total}
          amount={stock.amount}
          averagePrice={stock.mean_price}
        />
      ))}
    </div>
  );
}
