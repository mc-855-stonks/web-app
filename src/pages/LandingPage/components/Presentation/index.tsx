import React from "react";
import style from "./style.module.css";
import ilustrationImage from "./imgs/ilustration.png";

export default function Presentation() {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <h1 className={(style.titleTop, style.title)}>Acompanhe</h1>
        <h1 className={style.title}>seus rendimentos!</h1>
        <p className={style.description}>
          Tenha acesso à informações sobre seus rendimentos diários de forma
          simples e atualizada automaticamente
        </p>
      </div>
      <div>
        <img
          src={ilustrationImage}
          alt="ilustration"
          className={style["ilustration-image"]}
        />
      </div>
    </div>
  );
}
