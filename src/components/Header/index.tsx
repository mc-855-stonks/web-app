import React from "react";

import Title from "../Title";

import addIcon from "./imgs/add.svg";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClickAdd?: () => void;
}

export default function Header({ children, className, onClickAdd }: Props) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Title className={className || style.title}>{children}</Title>
        {onClickAdd && (
          <button
            onClick={onClickAdd}
            type="button"
            className={style["action-icon"]}
          >
            <img
              src={addIcon}
              alt="Adicionar Operação"
              className={style.icon}
            />
          </button>
        )}
      </div>
      <div className={style.separator} />
    </div>
  );
}

Header.defaultProps = {
  className: "",
  onClickAdd: null,
};
