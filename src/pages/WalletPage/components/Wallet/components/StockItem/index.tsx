import React from "react";

import { useAppDispatch } from "hooks";
import { showDeleteModal, showEditModal } from "slices/walletSlice";

import StockInfo from "./components/StockInfo";
import Yield from "./components/Yield";
import LastPrice from "./components/LastPrice";
import Position from "./components/Position";
import Summary from "./components/Summary";

import style from "./style.module.css";

import editIcon from "./imgs/edit.svg";
import deleteIcon from "./imgs/delete.svg";
import defaultStockImage from "./imgs/default.png";

interface Props {
  logo: string;
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
  logo,
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
      <img
        className={style.logo}
        src={logo === "" ? defaultStockImage : logo}
        alt=""
      />
      <StockInfo ticker={ticker} name={name} percentage={walletPercentage} />
      <Yield totalYield={totalYield} yieldPercentage={yieldPercentage} />
      <LastPrice price={lastPrice} />
      <Position buyPosition={buyPosition} currentPosition={currentPosition} />
      <div className={style.separator} />
      <Summary amount={amount} avgPrice={averagePrice} />
      <div className={style["action-icons"]}>
        <button
          type="button"
          className={style["icon-button"]}
          style={{ marginRight: 10 }}
          onClick={() => dispatch(showDeleteModal(ticker))}
        >
          <img src={deleteIcon} alt="delete" className={style.icon} />
        </button>
        <button
          type="button"
          className={style["icon-button"]}
          onClick={() => dispatch(showEditModal(ticker))}
        >
          <img src={editIcon} alt="edit" className={style.icon} />
        </button>
      </div>
    </div>
  );
}
