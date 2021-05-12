import React from "react";
import { useAppDispatch } from "hooks";

import Input from "components/Input";
import Modal from "components/Modal";
import Title from "components/Title";
import Button from "components/Button";

import { hideEditModal } from "slices/walletSlice";

import style from "./style.module.css";

export default function AddModal() {
  const dispatch = useAppDispatch();

  return (
    <Modal onClose={() => dispatch(hideEditModal())}>
      <Title style={{ marginTop: 48, marginBottom: 46 }}>
        Editar registro do ativo C3N3
      </Title>
      <Input style={{ marginBottom: 16 }} type="text" label="Código da Ação" />
      <Input style={{ marginBottom: 16 }} type="text" label="Data de compra" />
      <div className={style["stock-info-fields"]}>
        <Input
          style={{ width: 150, marginRight: 24 }}
          type="text"
          label="Quantidade"
        />
        <Input style={{ width: 250 }} type="text" label="Preço" />
      </div>
      <Button style={{ marginTop: 40 }} value="EDITAR REGISTRO DA AÇÃO" />
    </Modal>
  );
}
