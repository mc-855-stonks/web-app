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
      <MenuItem to="/dashboard" value="Dashboard" icon={homeIcon} />
      <MenuItem to="/wallet" value="Carteira" icon={walletIcon} />
      <MenuItem to="/profile" value="Configurações" icon={profileIcon} />
      <Footer />
    </div>
  );
}
