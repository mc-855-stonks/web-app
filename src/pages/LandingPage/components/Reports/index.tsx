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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </h3>
          <h3 className={style.author}>
            <b>João da Silva</b> | Estudante universitário e Estagiário em Data
            Science
          </h3>
        </div>
        <div className={style.line} />
      </div>
    </div>
  );
}
