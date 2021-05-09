import { DisplayValue } from "components/SelectInput";
import React from "react";

import style from "./style.module.css";

interface Props<T extends DisplayValue> {
  value: string;
  displayValue: T;
  onOptionSelected: (v: string) => void;
}

export default function Option<T extends DisplayValue>({
  value,
  displayValue,
  onOptionSelected,
}: Props<T>) {
  return (
    <button
      type="button"
      className={style.container}
      onClick={() => onOptionSelected(value)}
    >
      {displayValue}
    </button>
  );
}
