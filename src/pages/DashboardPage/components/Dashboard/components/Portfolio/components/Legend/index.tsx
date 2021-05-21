import React from "react";
import style from "./style.module.css";

interface LegendPointData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface Props {
  data: Array<LegendPointData>;
}

export default function Legend({ data }: Props) {
  return (
    <div className={style.legendGroup}>
      {data.map((legendPoint) => (
        <div className={style.legendRow}>
          <div
            className={style.legendBullet}
            style={{ backgroundColor: legendPoint.color }}
          />
          <div className={style.legendName}>{legendPoint.name}</div>
          <div className={style.legendText}>
            {`${Math.round(legendPoint.percentage)}%`}
          </div>
          <div className={style.legendText}>{`R$ ${legendPoint.value}`}</div>
        </div>
      ))}
    </div>
  );
}
