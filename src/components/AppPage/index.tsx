import SideMenu from "components/SideMenu";
import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export default function AppPage({ children }: Props) {
  return (
    <div className={style.container}>
      <SideMenu />
      <div className={style.content}>{children}</div>
    </div>
  );
}
