import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export default function Subtitle({ children }: Props) {
  return <h2 className={style.subtitle}>{children}</h2>;
}
