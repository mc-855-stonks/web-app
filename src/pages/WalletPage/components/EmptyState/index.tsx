import React from "react";

import Title from "components/Title";

import arrowImage from "./imgs/arrow.svg";
import style from "./style.module.css";

export default function EmptyState() {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <Title style={{ marginBottom: 39 }}>
          Sua carteira ainda está vazia
        </Title>
        <p className={style.text}>
          Para acompanhar o rendimento dos seus investimentos, registre uma
          compra de um ativo.
        </p>
        <p className={style.text}>Vamos começar?</p>
      </div>
      <img className={style.arrow} src={arrowImage} alt="" />
    </div>
  );
}
