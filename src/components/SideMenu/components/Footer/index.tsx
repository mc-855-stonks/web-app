import React from "react";

import hideIcon from "./imgs/hideIcon.svg";
import infoIcon from "./imgs/infoIcon.svg";
import logoutIcon from "./imgs/logoutIcon.svg";

import style from "./style.module.css";

export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style.separator} />
      <div className={style.icons}>
        <img src={infoIcon} alt="" className={style["info-icon"]} />
        <img src={hideIcon} alt="" className={style.icon} />
        <img src={logoutIcon} alt="" className={style.icon} />
      </div>
    </div>
  );
}
