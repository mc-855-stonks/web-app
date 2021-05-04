import React from "react";
import { Redirect } from "react-router-dom";

import SideMenu from "components/SideMenu";

import { getUserSessionId } from "utils/userSession";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export default function AppPage({ children }: Props) {
  if (getUserSessionId()) {
    return (
      <div className={style.container}>
        <SideMenu />
        <div className={style.content}>{children}</div>
      </div>
    );
  }
  return <Redirect to="/login" />;
}
