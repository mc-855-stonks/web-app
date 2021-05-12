import React from "react";
import ReactLoading from "react-loading";

import style from "./style.module.css";

export default function LoadingOverlay() {
  return (
    <div className={style.container}>
      <ReactLoading type="spin" color="white" height="64px" width="64px" />
    </div>
  );
}
