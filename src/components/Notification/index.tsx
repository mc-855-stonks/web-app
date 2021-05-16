import React from "react";
import style from "./style.module.css";
import closeIcon from "./imgs/close.svg";

interface Props {
  message: string;
  type: string;
}

const closeNotification = () => {
  const notificationElement = document.getElementById("notification");
  if (notificationElement) {
    notificationElement.remove();
  }
};

const waitNotificationExhibition = async () => {
  setTimeout(closeNotification, 7 * 1000);
};

export default function Notification({ message, type }: Props) {
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
      <div className={style.messageGroup}>
        <label className={style.message}>{message}</label>
      </div>
      <img
        className={style.closeIcon}
        src={closeIcon}
        alt="close"
        onClick={closeNotification}
      />
    </div>
  );
}
