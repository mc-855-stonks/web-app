import React from "react";
import moment from "moment";

import { formatCurrency } from "utils/formatters";

import style from "./style.module.css";

interface Props {
  amount: number;
  price: number;
  purchaseDate: Date;
  side: string;
}

export default function OperationSelectOption({
  amount,
  price,
  purchaseDate,
  side,
}: Props) {
  return (
    <div className={style.container}>
      <div className={style["date-side"]}>
        <div>Data da operação: {moment(purchaseDate).format("DD/MM/yyyy")}</div>
        <div>{side === "buy" ? "Compra" : "Venda"}</div>
      </div>
      <div className={style["operation-details"]}>
        <div>Quantidade: {amount}</div>
        <div>Preço: R${formatCurrency(price)}</div>
      </div>
    </div>
  );
}
