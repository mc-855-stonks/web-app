import React from "react";
import style from "./style.module.css";

interface Props {
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}

export default function Title({
  children,
  className,
  style: propStyle,
}: Props) {
  return (
    <h1 className={className || style.title} style={propStyle}>
      {children}
    </h1>
  );
}

Title.defaultProps = {
  className: "",
  style: {},
};
