import React from "react";
import style from "./style.module.css";
import Title from "../Title";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: Props) {
  return (
    <div className={style.container}>
      <Title className={className || style.title}>{children}</Title>
      <div className={style.separator} />
    </div>
  );
}

Header.defaultProps = {
  className: "",
};
