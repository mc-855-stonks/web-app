import React from "react";
import { removeUserSession } from "utils/userSession";
import { useHistory } from "react-router-dom";

import hideIcon from "./imgs/hideIcon.svg";
import infoIcon from "./imgs/infoIcon.svg";
import logoutIcon from "./imgs/logoutIcon.svg";

import style from "./style.module.css";

export default function Footer() {
  const history = useHistory();

  const onLogoutClick = () => {
    removeUserSession();
    history.push("/");
  };

  return (
    <div className={style.container}>
      <div className={style.separator} />
      <div className={style.icons}>
        <button type="button" className={style["footer-button"]}>
          <img src={infoIcon} alt="" className={style["info-icon"]} />
        </button>
        <button type="button" className={style["footer-button"]}>
          <img src={hideIcon} alt="" className={style.icon} />
        </button>
        <button type="button" className={style["footer-button"]}>
          <img
            src={logoutIcon}
            alt=""
            className={style.icon}
            onClick={onLogoutClick}
          />
        </button>
      </div>
    </div>
  );
}
