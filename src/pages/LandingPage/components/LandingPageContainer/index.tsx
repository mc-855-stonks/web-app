import React from "react";
import style from "./style.module.css";
import Header from "../Header";
import Presentation from "../Presentation";
import Benefits from "../Benefits";
import Statistics from "../Statistics";
import Reports from "../Reports";
import Footer from "../Footer";

export default function LandingPageContainer() {
  return (
    <div className={style.container}>
      <Header />
      <Presentation />
      <Benefits />
      <Statistics />
      <Reports />
      <Footer />
    </div>
  );
}
