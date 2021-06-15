import React from "react";
import { useAppSelector } from "hooks";

import Subtitle from "components/Subtitle";

import { selectWallet } from "slices/walletSlice";
import { selectStocks } from "slices/stockSlice";

import Results from "./components/Results";
import StockItem from "./components/StockItem";

import style from "./style.module.css";

export default function Wallet() {
  const wallet = useAppSelector(selectWallet);
  const stocks = useAppSelector(selectStocks);
  if (!wallet) {
    return null;
  }

  const getStockLogo = (ticker: string) => {
    return stocks.find((it) => it.ticker === ticker)?.image || "";
  };

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
          logo={getStockLogo(stock.ticker)}
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
