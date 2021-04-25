import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export default function Card({ children }: Props): JSX.Element {
  return <div className={style.container}>{children}</div>;
}
