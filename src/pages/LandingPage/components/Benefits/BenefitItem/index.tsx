import React from "react";
import style from "./style.module.css";

import image1 from "./imgs/image1.png";
import image2 from "./imgs/image2.png";
import image3 from "./imgs/image3.png";

const dictionary = { image1, image2, image3 };

interface Props {
  imageName: keyof typeof dictionary;
  titleTop: string;
  titleBottom: string;
  description: string;
}

export default function BenefitItem({
  imageName,
  titleTop,
  titleBottom,
  description,
}: Props) {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <img
          src={dictionary[imageName]}
          alt="ilustration"
          className={style["ilustration-image"]}
        />
        <h1 className={(style.titleTop, style.title)}>{titleTop}</h1>
        <h1 className={style.title}>{titleBottom}</h1>
        <div className={style.line} />
        <h1 className={style.description}>{description}</h1>
      </div>
    </div>
  );
}
