import React from "react";
import style from "./style.module.css";
import StatisticsItem from "./StatisticsItem";

export default function Statistics() {
  return (
    <div className={style.container}>
      <StatisticsItem
        title="99%"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
      />
      <div className={style.line} />
      <StatisticsItem
        title="2.000+"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
      />
      <div className={style.line} />
      <StatisticsItem
        title="33%"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
      />
    </div>
  );
}
