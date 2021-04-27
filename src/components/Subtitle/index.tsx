import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Subtitle({ children, style: propStyle }: Props) {
  return (
    <h2 className={style.subtitle} style={propStyle}>
      {children}
    </h2>
  );
}

Subtitle.defaultProps = {
  style: {},
};
