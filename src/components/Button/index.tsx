import React from "react";

import style from "./style.module.css";

interface Props {
  value: string;
  style?: React.CSSProperties;
}

export default function Button({ value, style: propStyle }: Props) {
  return (
    <button type="button" className={style.button} style={propStyle}>
      {value}
    </button>
  );
}

Button.defaultProps = {
  style: {},
};
