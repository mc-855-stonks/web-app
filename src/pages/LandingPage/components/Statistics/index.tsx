import React from "react";
import style from "./style.module.css";
import StatisticsItem from "./StatisticsItem";

export default function Statistics() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <StatisticsItem
          title="62%"
          description="dos nossos entrevistados disseram que possuem um perfil de investidor agressivo e apontaram como maior medo a queda repentina dos investimentos."
        />
        <div className={style.line} />
        <StatisticsItem
          title="3,5 mi+"
          description="de brasileiros investem na bolsa de valores atualmente, segundo dados da B3."
        />
        <div className={style.line} />
        <StatisticsItem
          title="20%"
          description="do volume das negociações de ações na B3 são feitas por investidores pessoas físicas."
        />
      </div>
    </div>
  );
}
