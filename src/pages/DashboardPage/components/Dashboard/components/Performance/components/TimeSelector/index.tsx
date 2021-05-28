import React from "react";
import style from "./style.module.css";

export default function TimeSelector() {
  return (
    <div className={style.container}>
      <div className={style.timeSelectorText}>Últimos:</div>
      <div className={style.timeSelectorMonthGroup}>
        <div className={style.timeSelectorTextEnabled}>12 meses</div>
        <div className={style.timeSelectorSeparatorEnabled} />
      </div>
      <div className={style.timeSelectorMonthGroup}>
        <div className={style.timeSelectorText}>6 meses</div>
        <div className={style.timeSelectorSeparator} />
      </div>
      <div className={style.timeSelectorMonthGroup}>
        <div className={style.timeSelectorText}>3 meses</div>
        <div className={style.timeSelectorSeparator} />
      </div>
    </div>
  );
}
