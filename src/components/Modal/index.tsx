import React from "react";

import closeIcon from "./imgs/closeIcon.svg";

import style from "./style.module.css";

interface Props {
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: Props) {
  return (
    <div className={style.container}>
      <div className={style.card}>
        {onClose && (
          <button onClick={onClose} className={style.close} type="button">
            <img src={closeIcon} alt="close" className={style["close-icon"]} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  onClose: undefined,
};
