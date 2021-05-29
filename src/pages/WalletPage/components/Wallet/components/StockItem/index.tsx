import React from "react";

import { useAppDispatch } from "hooks";
import { showEditModal } from "slices/walletSlice";

import StockInfo from "./components/StockInfo";
import Yield from "./components/Yield";
import LastPrice from "./components/LastPrice";
import Position from "./components/Position";
import Summary from "./components/Summary";

import style from "./style.module.css";

import editIcon from "./imgs/edit.svg";

interface Props {
  ticker: string;
  name: string;
  walletPercentage: number;
  totalYield: number;
  yieldPercentage: number;
  lastPrice: number;
  buyPosition: number;
  currentPosition: number;
  amount: number;
  averagePrice: number;
}

export default function StockItem({
  amount,
  averagePrice,
  buyPosition,
  currentPosition,
  lastPrice,
  name,
  ticker,
  totalYield,
  walletPercentage,
  yieldPercentage,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className={style.container}>
      <img className={style.logo} alt="" />
      <StockInfo ticker={ticker} name={name} percentage={walletPercentage} />
      <Yield totalYield={totalYield} yieldPercentage={yieldPercentage} />
      <LastPrice price={lastPrice} />
      <Position buyPosition={buyPosition} currentPosition={currentPosition} />
      <div className={style.separator} />
      <Summary amount={amount} avgPrice={averagePrice} />
      <button
        type="button"
        className={style.edit}
        onClick={() => dispatch(showEditModal(ticker))}
      >
        <img src={editIcon} alt="edit" className={style["edit-image"]} />
      </button>
    </div>
  );
}
