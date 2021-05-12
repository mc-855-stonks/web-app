import React from "react";
import loadingGif from "./gifs/loading.gif";
import style from "./style.module.css";

export default function Loading() {
  return (
    <div className={style.container}>
      <img
        src={loadingGif}
        alt="loading"
        width={128}
        height={128}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
    </div>
  );
}
