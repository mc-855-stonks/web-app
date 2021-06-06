import React, { useEffect } from "react";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "hooks";

import { formatCurrency } from "utils/formatters";

import Input from "components/Input";
import Modal from "components/Modal";
import Title from "components/Title";
import Button from "components/Button";
import SelectInput from "components/SelectInput";
import Checkbox from "components/Checkbox";

import {
  fetchEditingTickerOperations,
  hideEditModal,
  selectEditForm,
  selectEditingTicker,
  selectEditingTickerOperations,
  selectValidEditForm,
  updateEditFormAmount,
  updateEditFormOperationDate,
  updateEditFormPrice,
  updateEditFormSelectedOperation,
  updateEditFormSelectedOperationText,
  editFormSelectSide,
  updateOperation,
  selectDeletingModalVisible,
  deleteOperation as deleteOperationAction,
} from "slices/walletSlice";

import OperationSelectOption from "./components/OperationSelectOption";

import style from "./style.module.css";

export default function EditModal() {
  const dispatch = useAppDispatch();
  const editingTicker = useAppSelector(selectEditingTicker);
  const deleteOperation = useAppSelector(selectDeletingModalVisible);
  const {
    selectedOperationText,
    price,
    amount,
    operationDate,
    selectedOperation,
    showEditFormErrors,
    side,
  } = useAppSelector(selectEditForm);
  const buyChecked = side === "buy";
  const sellChecked = side === "sell";
  const {
    validAmount,
    validOperationDate,
    validPrice,
    validSelectedOperation,
  } = useAppSelector(selectValidEditForm);
  const operations = useAppSelector(selectEditingTickerOperations);
  const operationOptions = operations.map((it) => {
    return {
      value: it.id.toString(),
      displayValue: (
        <OperationSelectOption
          amount={it.amount}
          price={it.price}
          purchaseDate={moment(it.date, "yyyy-MM-DD").toDate()}
          side={it.side}
        />
      ),
      displayValueString: `Data: ${moment(it.date, "yyyy-MM-DD").format(
        "DD/MM/yyyy"
      )} Quantidade: ${it.amount} Preço: R$${formatCurrency(it.price)}`,
    };
  });

  const onOperationOptionSelected = (value: string, displayValue: string) => {
    dispatch(updateEditFormSelectedOperation(parseInt(value, 10)));
    dispatch(updateEditFormSelectedOperationText(displayValue));
  };

  useEffect(() => {
    dispatch(fetchEditingTickerOperations());
  }, [dispatch]);

  const buttonStyle = deleteOperation
    ? {
        backgroundColor: "#E7423C",
      }
    : {};

  const onButtonClick = () => {
    if (deleteOperation) {
      dispatch(deleteOperationAction());
    } else {
      dispatch(updateOperation());
    }
  };

  return (
    <Modal onClose={() => dispatch(hideEditModal())}>
      <Title style={{ marginTop: 48, marginBottom: 46 }}>
        {deleteOperation ? "Deletar" : "Editar"} registro do ativo{" "}
        {editingTicker}
      </Title>
      <SelectInput
        value={selectedOperationText}
        onChange={(e) =>
          dispatch(updateEditFormSelectedOperationText(e.target.value))
        }
        onOptionSelected={onOperationOptionSelected}
        style={{ marginBottom: 15 }}
        label="Operação"
        options={operationOptions}
        errorMode={showEditFormErrors && !validSelectedOperation}
        errorMessage="Campo obrigatório"
      />
      <Input
        disabled={deleteOperation}
        style={{ marginBottom: 16 }}
        type="text"
        label="Data da operação"
        value={operationDate}
        onChange={(e) => dispatch(updateEditFormOperationDate(e.target.value))}
        errorMode={showEditFormErrors && !validOperationDate}
        errorMessage="Campo obrigatório"
      />
      <div className={style["operation-type-fields"]}>
        Operação efetuada
        <Checkbox
          disabled={deleteOperation}
          label="Compra"
          style={{ marginLeft: 25 }}
          checked={buyChecked}
          onChange={() => dispatch(editFormSelectSide("buy"))}
        />
        <Checkbox
          disabled={deleteOperation}
          label="Venda"
          style={{ marginLeft: 25 }}
          checked={sellChecked}
          onChange={() => dispatch(editFormSelectSide("sell"))}
        />
      </div>

      <div className={style["stock-info-fields"]}>
        <Input
          disabled={deleteOperation}
          style={{ width: 150, marginRight: 24 }}
          type="text"
          label="Quantidade"
          value={amount}
          onChange={(e) => dispatch(updateEditFormAmount(e.target.value))}
          errorMode={showEditFormErrors && !validAmount}
          errorMessage="Campo obrigatório"
        />
        <Input
          disabled={deleteOperation}
          style={{ width: 250 }}
          type="text"
          label="Preço"
          value={price}
          onChange={(e) => dispatch(updateEditFormPrice(e.target.value))}
          errorMode={showEditFormErrors && !validPrice}
          errorMessage="Campo obrigatório"
        />
      </div>
      <Button
        style={{ marginTop: 40, ...buttonStyle }}
        value={
          deleteOperation
            ? "DELETAR REGISTRO DA AÇÃO"
            : "EDITAR REGISTRO DA AÇÃO"
        }
        disabled={selectedOperation === -1}
        onClick={onButtonClick}
      />
    </Modal>
  );
}
