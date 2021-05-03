import React from "react";
import stylesProductInfo from "./style.module.css";
import Subtitle from "../../../../components/Subtitle";
import Title from "../../../../components/Title";

export default function ProductInfo() {
  return (
    <div className={stylesProductInfo.container}>
      <Subtitle>Informações</Subtitle>
      <div className={stylesProductInfo.productContent}>
        <div className={stylesProductInfo.productInfoGroup}>
          <Title
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTitle}`}
          >
            Sobre
          </Title>
          <h2
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTextAbout}`}
          >
            O nomedosite foi desenvolvido para a disciplina MC855 - Projeto em
            Sistemas de Computação da Universidade Estadual de Campinas
            (Unicamp) ministrada pelo Professor Doutor Arthur João Catto no 1°
            semestre de 2021.
          </h2>
        </div>
        <div className={stylesProductInfo.productInfoGroup}>
          <Title
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTitle}`}
          >
            Desenvolvedores
          </Title>
          <h2
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTextAbout}`}
          >
            Gabriel Oliveira dos Santos
          </h2>
          <h2
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTextAbout}`}
          >
            João Vitor Araki Gonçalves
          </h2>
          <h2
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTextAbout}`}
          >
            Luma Gabino Vasconcelos
          </h2>
          <h2
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTextAbout}`}
          >
            Matheus Esteves Zanoto
          </h2>
        </div>
        <div className={stylesProductInfo.productInfoGroup}>
          <Title
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTitle}`}
          >
            Contato
          </Title>
          <h2
            className={`${stylesProductInfo.productInfoText} ${stylesProductInfo.productInfoTextAbout}`}
          >
            nomedosite@gmail.com
          </h2>
        </div>
      </div>
    </div>
  );
}
