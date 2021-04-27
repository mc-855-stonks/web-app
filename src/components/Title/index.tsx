import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Title({ children, style: propStyle }: Props) {
  return (
    <h1 className={style.title} style={propStyle}>
      {children}
    </h1>
  );
}

Title.defaultProps = {
  style: {},
};
