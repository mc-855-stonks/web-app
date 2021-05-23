import React from "react";
import { useAppDispatch, useAppSelector } from "hooks";

import Input from "components/Input";
import Modal from "components/Modal";
import Title from "components/Title";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import SelectInput from "components/SelectInput";

import {
  addFormSelectSide,
  hideAddModal,
  selectAddForm,
  updateAddFormAmount,
  updateAddFormOperationDate,
  updateAddFormPrice,
  updateAddFormSelectedStock,
  updateAddFormTicker,
} from "slices/walletSlice";
import { selectStocks } from "slices/stockSlice";

import style from "./style.module.css";

export default function AddModal() {
  const dispatch = useAppDispatch();
  const { amount, operationDate, price, stockTicker, side } = useAppSelector(
    selectAddForm
  );
  const stocks = useAppSelector(selectStocks);
  const stockOptions = stocks.map((it) => {
    return {
      value: it.id.toString(),
      displayValue: it.ticker,
    };
  });
  const buyChecked = side === "buy";
  const sellChecked = side === "sell";
  const onStockOptionSelected = (value: string, displayValue: string) => {
    dispatch(updateAddFormTicker(displayValue));
    dispatch(updateAddFormSelectedStock(parseInt(value, 10)));
  };

  return (
    <Modal onClose={() => dispatch(hideAddModal())}>
      <Title style={{ marginTop: 48, marginBottom: 46 }}>
        Adicionar uma ação a carteira
      </Title>
      <SelectInput
        value={stockTicker}
        onChange={(e) => dispatch(updateAddFormTicker(e.target.value))}
        onOptionSelected={onStockOptionSelected}
        style={{ marginBottom: 15 }}
        label="Código da ação"
        options={stockOptions}
        errorMode={false}
        errorMessage="Campo obrigatório"
      />
      <div className={style["operation-type-fields"]}>
        Operação efetuada
        <Checkbox
          label="Compra"
          style={{ marginLeft: 25 }}
          checked={buyChecked}
          onChange={() => dispatch(addFormSelectSide("buy"))}
        />
        <Checkbox
          label="Venda"
          style={{ marginLeft: 25 }}
          checked={sellChecked}
          onChange={() => dispatch(addFormSelectSide("sell"))}
        />
      </div>
      <Input
        style={{ marginBottom: 16 }}
        type="text"
        label="Data de compra"
        value={operationDate}
        placeholder="__ / __ / ____"
        onChange={(e) => dispatch(updateAddFormOperationDate(e.target.value))}
      />
      <div className={style["stock-info-fields"]}>
        <Input
          style={{ width: 150, marginRight: 24 }}
          type="text"
          label="Quantidade"
          value={amount}
          onChange={(e) => dispatch(updateAddFormAmount(e.target.value))}
        />
        <Input
          style={{ width: 250 }}
          type="text"
          label="Preço de compra"
          value={price}
          onChange={(e) => dispatch(updateAddFormPrice(e.target.value))}
          placeholder="R$"
        />
      </div>
      <Button style={{ marginTop: 40 }} value="ADICIONAR A AÇÃO" />
    </Modal>
  );
}
