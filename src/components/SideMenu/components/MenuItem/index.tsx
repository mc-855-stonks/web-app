import React from "react";

import { NavLink } from "react-router-dom";

import style from "./style.module.css";

interface Props {
  value: string;
  icon: string;
  to: string;
}

export default function MenuItem({ value, icon, to }: Props) {
  return (
    <NavLink
      to={to}
      style={{ textDecoration: "none", color: "white" }}
      activeClassName={style.active}
    >
      <div className={style.container}>
        <div className={style.content}>
          <img src={icon} alt="" className={style.icon} />
          {value}
        </div>
        <div className={style.separator} />
      </div>
    </NavLink>
  );
}
