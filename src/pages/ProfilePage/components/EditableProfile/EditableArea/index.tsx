import React from "react";
import styles from "./style.module.css";
import Input from "../../../../../components/Input";

export default function EditableArea() {
  return (
    <div className={styles.container}>
      <Input
        value=""
        style={{ marginBottom: 15, height: 64 }}
        type="text"
        label="Nome"
      />
      <Input
        value=""
        style={{ marginBottom: 15 }}
        type="text"
        label="Perfil de Investidor"
      />
      <Input
        value=""
        style={{ marginBottom: 15 }}
        type="password"
        label="Senha"
      />
      <Input
        value=""
        style={{ marginBottom: 15 }}
        type="password"
        label="Confirmar Senha"
      />
    </div>
  );
}
