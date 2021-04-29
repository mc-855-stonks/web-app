import React from "react";
import stylesProductInfo from "./style.module.css";
import stylesProfilePage from "../../style.module.css";
import Title from "../../../../components/Title";

export default function ProductInfo() {
  return (
    <div className={stylesProductInfo.container}>
      <Title className={stylesProfilePage.title}>Informações</Title>
    </div>
  );
}
