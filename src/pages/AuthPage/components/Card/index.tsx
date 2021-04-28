import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({
  children,
  style: propStyle,
}: Props): JSX.Element {
  return (
    <div className={style.container} style={propStyle}>
      {children}
    </div>
  );
}

Card.defaultProps = {
  style: {},
};
