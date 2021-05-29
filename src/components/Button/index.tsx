import React from "react";
import style from "./style.module.css";

interface Props {
  value: string;
  style?: React.CSSProperties;
  onClick?: VoidFunction;
  disabled?: boolean;
}

export default function Button({
  value,
  style: propStyle,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      type="button"
      className={style.button}
      style={propStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

Button.defaultProps = {
  style: {},
  onClick: null,
  disabled: false,
};
