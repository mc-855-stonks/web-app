import React from "react";

import MenuItem from "./components/MenuItem";
import Footer from "./components/Footer";

import walletIcon from "./imgs/walletIcon.svg";
import homeIcon from "./imgs/homeIcon.svg";
import profileIcon from "./imgs/profileIcon.svg";

import style from "./style.module.css";

export default function SideMenu() {
  return (
    <div className={style.container}>
      <MenuItem value="Dashboard" icon={homeIcon} active />
      <MenuItem value="Carteira" icon={walletIcon} />
      <MenuItem value="Configurações" icon={profileIcon} />
      <Footer />
    </div>
  );
}
