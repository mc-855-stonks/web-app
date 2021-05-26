import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function Header() {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <div className={style.contentBottom}>
          <Link to="/login" className={style.buttonLogin}>
            LOGIN
          </Link>
          <Link to="/register" className={style.buttonRegister}>
            CRIAR CONTA
          </Link>
        </div>
        <div className={style.gradient} />
      </div>
    </div>
  );
}
