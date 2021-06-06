import React from "react";

import style from "./style.module.css";

interface Props {
  label: string;
  style?: React.CSSProperties;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export default function Checkbox({
  label,
  style: propStyle,
  checked,
  onChange,
  disabled,
}: Props) {
  return (
    <div style={propStyle}>
      <label className={style.label}>
        <input
          disabled={disabled}
          className="checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />{" "}
        {label}
      </label>
    </div>
  );
}

Checkbox.defaultProps = {
  style: {},
  checked: false,
  onChange: () => {},
  disabled: false,
};
