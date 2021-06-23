import React from "react";

import MenuItem from "./components/MenuItem";
import Footer from "./components/Footer";

import walletIcon from "./imgs/walletIcon.svg";
import homeIcon from "./imgs/homeIcon.svg";
import profileIcon from "./imgs/profileIcon.svg";
import walletActiveIcon from "./imgs/walletActiveIcon.svg";
import homeActiveIcon from "./imgs/homeActiveIcon.svg";
import profileActiveIcon from "./imgs/profileActiveIcon.svg";
import logo from "./imgs/logo.png";

import style from "./style.module.css";

export default function SideMenu() {
  return (
    <div className={style.container}>
      <img src={logo} alt="Logo" className={style.logo} />
      <MenuItem
        to="/dashboard"
        value="Dashboard"
        icon={homeIcon}
        activeIcon={homeActiveIcon}
      />
      <MenuItem
        to="/wallet"
        value="Carteira"
        icon={walletIcon}
        activeIcon={walletActiveIcon}
      />
      <MenuItem
        to="/profile"
        value="Configurações"
        icon={profileIcon}
        activeIcon={profileActiveIcon}
      />
      <Footer />
    </div>
  );
}
