import React from "react";
import { Link } from "react-router-dom";

import Input from "components/Input";
import Button from "components/Button";
import Title from "components/Title";
import Checkbox from "components/Checkbox";

import { useAppSelector, useAppDispatch } from "hooks";
import {
  selectFormData,
  updatePassword,
  updateEmail,
  updateInvestorProfile,
  updateName,
  updatePasswordConfirmation,
} from "slices/registerSlice";

import Card from "../Card";

import style from "./style.module.css";

export default function RegisterCard() {
  const {
    email,
    investorProfile,
    name,
    password,
    passwordConfirmation,
  } = useAppSelector(selectFormData);
  const dispatch = useAppDispatch();

  return (
    <div className={style.container}>
      <Card>
        <span className={style.login}>
          Já possui uma conta?{" "}
          <Link to="/login" className={style.link}>
            Entrar
          </Link>
        </span>
        <Title style={{ marginBottom: 24, marginRight: "auto" }}>
          Crie sua conta.
        </Title>
        <Input
          value={name}
          onChange={(e) => dispatch(updateName(e.target.value))}
          style={{ marginBottom: 15 }}
          type="text"
          label="Nome"
        />
        <Input
          onChange={(e) => dispatch(updateInvestorProfile(e.target.value))}
          value={investorProfile}
          style={{ marginBottom: 15 }}
          type="text"
          label="Perfil de Investidor"
        />
        <Input
          onChange={(e) => dispatch(updateEmail(e.target.value))}
          value={email}
          style={{ marginBottom: 15 }}
          type="email"
          label="Email"
        />
        <Input
          onChange={(e) => dispatch(updatePassword(e.target.value))}
          value={password}
          style={{ marginBottom: 15 }}
          type="password"
          label="Senha"
        />
        <Input
          onChange={(e) => dispatch(updatePasswordConfirmation(e.target.value))}
          value={passwordConfirmation}
          style={{ marginBottom: 25 }}
          type="password"
          label="Confirmação de Senha"
        />
        <Checkbox
          style={{ marginBottom: 40 }}
          label="Aceito os Termos de Serviço e Política de Privacidade"
        />
        <Button value="ENTRAR" />
      </Card>
    </div>
  );
}
