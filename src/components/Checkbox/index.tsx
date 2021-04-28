import React from "react";

import style from "./style.module.css";

interface Props {
  label: string;
  style?: React.CSSProperties;
}

export default function Checkbox({ label, style: propStyle }: Props) {
  return (
    <div style={propStyle}>
      <label className={style.label}>
        <input className="checkbox" type="checkbox" /> {label}
      </label>
    </div>
  );
}

Checkbox.defaultProps = {
  style: {},
};
