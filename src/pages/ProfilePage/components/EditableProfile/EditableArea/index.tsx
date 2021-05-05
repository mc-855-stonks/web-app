import React from "react";
import { useAppSelector, useAppDispatch } from "hooks";
import {
  selectFormData,
  updatePassword,
  updateInvestorProfile,
  updateName,
  updatePasswordConfirmation,
} from "slices/profileSlice";
import styles from "./style.module.css";
import Input from "../../../../../components/Input";

export default function EditableArea() {
  const { investorProfile, name, password } = useAppSelector(selectFormData);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <Input
        value={name}
        onChange={(e) => dispatch(updateName(e.target.value))}
        style={{ marginBottom: 15 }}
        type="text"
        label="Nome"
      />
      <Input
        value={investorProfile}
        onChange={(e) => dispatch(updateInvestorProfile(e.target.value))}
        style={{ marginBottom: 15 }}
        type="text"
        label="Perfil de Investidor"
      />
      <Input
        value={password}
        onChange={(e) => dispatch(updatePassword(e.target.value))}
        style={{ marginBottom: 15 }}
        type="password"
        label="Senha"
      />
      <Input
        value=""
        onChange={(e) => dispatch(updatePasswordConfirmation(e.target.value))}
        style={{ marginBottom: 15 }}
        type="password"
        label="Confirmar Senha"
      />
    </div>
  );
}
