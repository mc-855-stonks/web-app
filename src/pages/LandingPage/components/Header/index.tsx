import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function Header() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Link to="/login" className={style["button-login"]}>
          LOGIN
        </Link>
        <Link to="/register" className={style["button-register"]}>
          CRIAR CONTA
        </Link>
      </div>
      <div className={style.gradient} />
    </div>
  );
}
