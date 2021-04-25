import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export default function Title({ children }: Props) {
  return <h1 className={style.title}>{children}</h1>;
}
