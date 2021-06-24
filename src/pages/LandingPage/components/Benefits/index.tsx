import React from "react";
import BenefitItem from "./BenefitItem";
import style from "./style.module.css";

export default function Benefits() {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <div className={style["first-benefit"]}>
          <BenefitItem
            imageName="image1"
            titleTop="Acompanhamento diário"
            titleBottom="dos seus rendimentos"
            description="Na tela de Carteira, o rendimento diário dos seus ativos estará disponível, podendo ser facilmente analisado qual ativo teve melhor resultado naquele dia, qual o valor obtido no dia e o valor atual em relação ao valor de compra."
          />
        </div>
        <div>
          <BenefitItem
            imageName="image3"
            titleTop="Comparações com índices"
            titleBottom="do mercado"
            description="Também poderá acompanhar a evolução de seus rendimentos por meio de uma visão completa. Contando com gráficos de benchmark de mercado e os índices comparativos mais relevantes da bolsa."
          />
        </div>
      </div>
      <div className={style["second-benefit"]}>
        <BenefitItem
          imageName="image2"
          titleTop="Estatítiscas sobre"
          titleBottom="sua carteira"
          description="Na tela de Dashboard, você poderá ver quais setores da economia concentram seus investimentos e os meses que seu dinheiro rendeu mais. Além de ver o rendimento total da sua carteira desde o início de seus investimentos até a data presente."
        />
      </div>
    </div>
  );
}
