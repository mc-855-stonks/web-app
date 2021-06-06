import React from "react";

import style from "./style.module.css";

interface Props {
  type: string;
  label: string;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string;
  errorMode?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  type,
  label,
  placeholder,
  value,
  onChange,
  style: propStyle,
  errorMode,
  errorMessage,
  disabled,
}: Props) {
  return (
    <div className={style.container} style={propStyle}>
      <div className={style.label}>{label}</div>
      <input
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        style={errorMode ? { border: `1px solid #C12B29` } : {}}
      />
      {errorMode && <div className={style.errorIcon} />}
      {errorMessage && errorMode && (
        <div className={style.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

Input.defaultProps = {
  placeholder: "",
  style: {},
  errorMode: false,
  errorMessage: "",
  value: "",
  onChange: () => {},
  disabled: false,
};
