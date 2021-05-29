import React from "react";
import style from "./style.module.css";

interface Props {
  displayType: string;
  selectTwelveMonths: VoidFunction;
  selectSixMonths: VoidFunction;
  selectThreeMonths: VoidFunction;
}

export default function TimeSelector({
  displayType,
  selectTwelveMonths,
  selectSixMonths,
  selectThreeMonths,
}: Props) {
  const textTwelveMonthsClassname = displayType === "12-months"
    ? style.timeSelectorTextEnabled
    : style.timeSelectorText;
  const separatorTwelveMonthsClassname = displayType === "12-months"
    ? style.timeSelectorSeparatorEnabled
    : style.timeSelectorSeparator;
  const textSixMonthsClassname = displayType === "6-months"
    ? style.timeSelectorTextEnabled
    : style.timeSelectorText;
  const separatorSixMonthsClassname = displayType === "6-months"
    ? style.timeSelectorSeparatorEnabled
    : style.timeSelectorSeparator;
  const textThreeMonthsClassname = displayType === "3-months"
    ? style.timeSelectorTextEnabled
    : style.timeSelectorText;
  const separatorThreeMonthsClassname = displayType === "3-months"
    ? style.timeSelectorSeparatorEnabled
    : style.timeSelectorSeparator;

  return (
    <div className={style.container}>
      <div className={style.timeSelectorText}>Últimos:</div>
      <div
        className={style.timeSelectorMonthGroup}
        onClick={selectTwelveMonths}
      >
        <div className={textTwelveMonthsClassname}>12 meses</div>
        <div className={separatorTwelveMonthsClassname} />
      </div>
      <div
        className={style.timeSelectorMonthGroup}
        onClick={selectSixMonths}
      >
        <div className={textSixMonthsClassname}>6 meses</div>
        <div className={separatorSixMonthsClassname} />
      </div>
      <div
        className={style.timeSelectorMonthGroup}
        onClick={selectThreeMonths}
      >
        <div className={textThreeMonthsClassname}>3 meses</div>
        <div className={separatorThreeMonthsClassname} />
      </div>
    </div>
  );
}
