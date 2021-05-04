import React from "react";
import { useAppDispatch } from "hooks";

import Input from "components/Input";
import Modal from "components/Modal";
import Title from "components/Title";
import Button from "components/Button";

import { hideAddModal } from "slices/walletSlice";

import style from "./style.module.css";

export default function AddModal() {
  const dispatch = useAppDispatch();

  return (
    <Modal onClose={() => dispatch(hideAddModal())}>
      <Title style={{ marginTop: 48, marginBottom: 46 }}>
        Adicionar uma ação a carteira
      </Title>
      <Input style={{ marginBottom: 16 }} type="text" label="Código da Ação" />
      <Input style={{ marginBottom: 16 }} type="text" label="Data de compra" />
      <div className={style["stock-info-fields"]}>
        <Input
          style={{ width: 150, marginRight: 24 }}
          type="text"
          label="Quantidade"
        />
        <Input style={{ width: 250 }} type="text" label="Preço de compra" />
      </div>
      <Button style={{ marginTop: 40 }} value="ADICIONAR A AÇÃO" />
    </Modal>
  );
}
