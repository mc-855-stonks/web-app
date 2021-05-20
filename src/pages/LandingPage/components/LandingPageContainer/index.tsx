import React from "react";
import style from "./style.module.css";
import Presentation from "../Presentation";

export default function LandingPageContainer() {
  return (
    <div className={style.container}>
      <Presentation />
    </div>
  );
}
