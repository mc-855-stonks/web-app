import React from "react";
import style from "./style.module.css";

interface Props {
  title: string;
  description: string;
}

export default function StatisticsItem({ title, description }: Props) {
  return (
    <div className={style.container}>
      <h3 className={style.title}>{title}</h3>
      <h3 className={style.description}>{description}</h3>
    </div>
  );
}
