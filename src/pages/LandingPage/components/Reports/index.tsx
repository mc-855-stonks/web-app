import React from "react";
import style from "./style.module.css";
import quoteImage from "./imgs/quote-mark.png";

export default function Reports() {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <img
          src={quoteImage}
          alt="quoteImage"
          className={style["quote-image"]}
        />
        <div className={style.item}>
          <h3 className={style.quote}>
            A minha corretora não mostra o rendimento bruto da minha carteira,
            minha posição é zerada todo dia. Faltava essa visualização, pois me
            fazia usar o Excel para fazer este acompanhamento. Agora com Rendeu
            não preciso mais! Tenho uma forma de ver a real valorização do meu
            dinheiro e das minhas possíveis vantagens futuras.
          </h3>
          <h3 className={style.author}>
            <b>Leonardo Yudi</b> | Estudante universitário & Estagiário em P&D
          </h3>
        </div>
        <div className={style.line} />
      </div>
    </div>
  );
}
