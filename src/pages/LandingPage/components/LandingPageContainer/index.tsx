import React from "react";
import style from "./style.module.css";
import Presentation from "../Presentation";
import Benefits from "../Benefits";
import Statistics from "../Statistics";

export default function LandingPageContainer() {
  return (
    <div className={style.container}>
      <Presentation />
      <Benefits />
      <Statistics />
    </div>
  );
}
