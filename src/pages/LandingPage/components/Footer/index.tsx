import React from "react";
import style from "./style.module.css";
import SiteInfo from "./SiteInfo";

import logo from "./imgs/logo.png";

export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <img className={style.space} src={logo} alt="" />
        <h3 className={style.link}>Termos e Condições</h3>
        <h3 className={style.link}>Login</h3>
        <div className={style.contact}>
          <SiteInfo label="Contato" info="contato@rendeu.com" />
        </div>
        <SiteInfo label="Criação" info="@2021 Rendeu™" />
      </div>
    </div>
  );
}
