import React from "react";

import style from "./style.module.css";

interface Props {
  type: string;
  label: string;
  placeholder?: string;
}

export default function Input({ type, label, placeholder }: Props) {
  return (
    <div className={style.container}>
      <div className={style.label}>{label}</div>
      <input placeholder={placeholder} type={type} />
    </div>
  );
}

Input.defaultProps = {
  placeholder: "",
};
