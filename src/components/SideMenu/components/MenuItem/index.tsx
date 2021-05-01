import React from "react";
import classnames from "classnames";

import style from "./style.module.css";

interface Props {
  value: string;
  icon: string;
  active?: boolean;
}

export default function MenuItem({ value, icon, active }: Props) {
  const containerClasses = classnames(style.container, {
    [style.active]: active,
  });

  const separatorClasses = classnames(style.separator, {
    [style.active]: active,
  });

  return (
    <div className={containerClasses}>
      <div className={style.content}>
        <img src={icon} alt="" className={style.icon} />
        {value}
      </div>
      <div className={separatorClasses} />
    </div>
  );
}

MenuItem.defaultProps = {
  active: false,
};
