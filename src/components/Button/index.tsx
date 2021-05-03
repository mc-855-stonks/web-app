import React from "react";
import style from "./style.module.css";

interface Props {
  value: string;
  style?: React.CSSProperties;
  onClick?: VoidFunction;
}

export default function Button({ value, style: propStyle, onClick }: Props) {
  return (
    <button
      type="button"
      className={style.button}
      style={propStyle}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

Button.defaultProps = {
  style: {},
  onClick: null,
};
