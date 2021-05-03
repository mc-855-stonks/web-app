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
          <i
            className={style["action-icon"]}
            style={{ backgroundImage: `url(${addIcon})` }}
          >
            add
          </i>
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
