import React from "react";
import style from "./style.module.css";

import StockInfo from "./components/StockInfo";
import Yield from "./components/Yield";
import LastPrice from "./components/LastPrice";
import Position from "./components/Position";
import Summary from "./components/Summary";

import editIcon from "./imgs/edit.svg";

export default function StockItem() {
  return (
    <div className={style.container}>
      <img className={style.logo} alt="" />
      <StockInfo
        ticker="CSNA3"
        name="CIA SIDERURGICA NACIONAL"
        percentage={15}
      />
      <Yield totalYield={4.18} yieldPercentage={0.36} />
      <LastPrice price={30.55} />
      <Position buyPosition={1156.72} currentPosition={1160.9} />
      <div className={style.separator} />
      <Summary amount={38} avgPrice={30.44} />
      <button type="button" className={style.edit}>
        <img src={editIcon} alt="edit" className={style["edit-image"]} />
      </button>
    </div>
  );
}
