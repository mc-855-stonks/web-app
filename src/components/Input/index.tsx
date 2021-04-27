import React from "react";

import style from "./style.module.css";

interface Props {
  type: string;
  label: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function Input({
  type,
  label,
  placeholder,
  style: propStyle,
}: Props) {
  return (
    <div className={style.container} style={propStyle}>
      <div className={style.label}>{label}</div>
      <input placeholder={placeholder} type={type} />
    </div>
  );
}

Input.defaultProps = {
  placeholder: "",
  style: {},
};
