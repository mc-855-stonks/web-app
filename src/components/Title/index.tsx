import React from "react";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className }: Props) {
  return <h1 className={className || style.title}>{children}</h1>;
}

Title.defaultProps = {
  className: "",
};
