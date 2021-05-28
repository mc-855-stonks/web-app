import React from "react";
import style from "./style.module.css";
import ilustrationImage from "./imgs/ilustration.png";

export default function Presentation() {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <h1 className={(style.titleTop, style.title)}>Acompanhe</h1>
        <h1 className={style.title}>seus rendimentos!</h1>
        <h1 className={style.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy tex ever
          since the 1500s
        </h1>
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
