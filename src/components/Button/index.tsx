import React from "react";

import style from "./style.module.css";

interface Props {
  value: string;
}

export default function Button({ value }: Props) {
  return (
    <button type="button" className={style.button}>
      {value}
    </button>
  );
}
