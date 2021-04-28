import React from "react";

import style from "./style.module.css";

interface Props {
  type: string;
  label: string;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  type,
  label,
  placeholder,
  value,
  onChange,
  style: propStyle,
}: Props) {
  return (
    <div className={style.container} style={propStyle}>
      <div className={style.label}>{label}</div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
}

Input.defaultProps = {
  placeholder: "",
  style: {},
  value: "",
  onChange: () => {},
};
