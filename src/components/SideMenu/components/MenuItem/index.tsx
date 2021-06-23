import React from "react";

import { NavLink, useRouteMatch } from "react-router-dom";

import style from "./style.module.css";

interface Props {
  value: string;
  icon: string;
  activeIcon: string;
  to: string;
}

export default function MenuItem({ value, icon, activeIcon, to }: Props) {
  const active = useRouteMatch(to);

  return (
    <NavLink
      to={to}
      style={{ textDecoration: "none", color: "white" }}
      activeClassName={style.active}
    >
      <div className={style.container}>
        <div className={style.content}>
          <img src={active ? activeIcon : icon} alt="" className={style.icon} />
          {value}
        </div>
        <div className={style.separator} />
      </div>
    </NavLink>
  );
}
