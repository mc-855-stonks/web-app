import React from "react";
import style from "./style.module.css";

interface Props {
  label: string;
  info: string;
}

export default function SiteInfo({ label, info }: Props) {
  return (
    <div className={style.container}>
      <h3 className={style.label}>{label}</h3>
      <h3 className={style.info}>{info}</h3>
    </div>
  );
}
