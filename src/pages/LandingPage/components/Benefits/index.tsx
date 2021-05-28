import React from "react";
import BenefitItem from "./BenefitItem";
import style from "./style.module.css";

export default function Benefits() {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <div className={style.firstBenefit}>
          <BenefitItem
            imageName="image1"
            titleTop="Acompanhamento diário"
            titleBottom="dos seus rendimentos"
            description=" Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged."
          />
        </div>
        <div className={style.tirdBenefit}>
          <BenefitItem
            imageName="image3"
            titleTop="Comparações com índices"
            titleBottom="do mercado"
            description=" Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged."
          />
        </div>
      </div>
      <div className={style.secondBenefit}>
        <BenefitItem
          imageName="image2"
          titleTop="Estatítiscas sobre"
          titleBottom="sua carteira"
          description=" Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged."
        />
      </div>
    </div>
  );
}
