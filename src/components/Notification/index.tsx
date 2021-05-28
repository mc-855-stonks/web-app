import React from "react";
import style from "./style.module.css";
import closeIcon from "./imgs/close.svg";

interface Props {
  message: string;
  type: "error" | "success";
  onDismiss: VoidFunction;
}

export default function Notification({ message, type, onDismiss }: Props) {
  const waitNotificationExhibition = async () => {
    setTimeout(onDismiss, 7 * 1000);
  };

  waitNotificationExhibition();
  return (
    <div
      id="notification"
      className={style.container}
      style={
        type === "success"
          ? { backgroundColor: "#5FBA34" }
          : { backgroundColor: "#E7423C" }
      }
    >
      <div className={style.messageContainer}>
        <div className={style.messageGroup}>
          {type === "error" && <div className={style.errorIcon}>!</div>}
          <label className={style.message}>{message}</label>
        </div>
      </div>
      <img
        className={style.closeIcon}
        src={closeIcon}
        alt="close"
        onClick={onDismiss}
      />
    </div>
  );
}
