import React from "react";
import { useHistory } from "react-router-dom";

import { selectHideValues, toggleHideValues } from "slices/settingsSlice";
import { removeUserSession } from "utils/userSession";
import { useAppDispatch, useAppSelector } from "hooks";

import hideIcon from "./imgs/hideIcon.svg";
import infoIcon from "./imgs/infoIcon.svg";
import logoutIcon from "./imgs/logoutIcon.svg";

import style from "./style.module.css";

export default function Footer() {
  const dispatch = useAppDispatch();
  const hideValues = useAppSelector(selectHideValues);
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
        <button
          type="button"
          className={style["footer-button"]}
          onClick={() => dispatch(toggleHideValues())}
        >
          <img
            src={hideIcon}
            alt=""
            className={style.icon}
            style={{ opacity: hideValues ? "1" : "0.3" }}
          />
        </button>
        <button
          type="button"
          className={style["footer-button"]}
          onClick={onLogoutClick}
        >
          <img src={logoutIcon} alt="" className={style.icon} />
        </button>
      </div>
    </div>
  );
}
