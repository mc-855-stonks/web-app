import React from "react";
import { Link, Redirect } from "react-router-dom";

import { investorProfileMapping } from "types/InvestorProfile";

import Input from "components/Input";
import Button from "components/Button";
import Title from "components/Title";
import Checkbox from "components/Checkbox";
import SelectInput from "components/SelectInput";
import Loading from "components/Loading";

import { useAppSelector, useAppDispatch } from "hooks";
import {
  selectFormData,
  updatePassword,
  updateEmail,
  updateInvestorProfileDisplayText,
  updateInvestorProfileValue,
  updateName,
  updatePasswordConfirmation,
  selectStatus,
  register,
} from "slices/registerSlice";

import Card from "../Card";

import styleRegister from "./style.module.css";
import stylePage from "../../style.module.css";

export default function RegisterCard() {
  const {
    email,
    investorProfileDisplayText,
    name,
    password,
    passwordConfirmation,
  } = useAppSelector(selectFormData);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  switch (status) {
    case "success":
      return <Redirect to="/login" />;
    case "loading":
      return <Loading />;
    default:
      return (
        <div className={styleRegister.container}>
          <Card>
            <span className={styleRegister.login}>
              Já possui uma conta?{" "}
              <Link to="/login" className={styleRegister.link}>
                Entrar
              </Link>
            </span>
            <Title className={stylePage.title}>Crie sua conta.</Title>
            <Input
              value={name}
              onChange={(e) => dispatch(updateName(e.target.value))}
              style={{ marginBottom: 15 }}
              type="text"
              label="Nome"
            />
            <SelectInput
              label="Perfil de Investidor"
              value={investorProfileDisplayText}
              onChange={(e) =>
                dispatch(updateInvestorProfileDisplayText(e.target.value))
              }
              onOptionSelected={(v) => dispatch(updateInvestorProfileValue(v))}
              options={investorProfileMapping}
              style={{ marginBottom: 15 }}
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
              onChange={(e) =>
                dispatch(updatePasswordConfirmation(e.target.value))
              }
              value={passwordConfirmation}
              style={{ marginBottom: 25 }}
              type="password"
              label="Confirmação de Senha"
            />
            <Checkbox
              style={{ marginBottom: 40 }}
              label="Aceito os Termos de Serviço e Política de Privacidade"
            />
            <Button value="ENTRAR" onClick={() => dispatch(register())} />
          </Card>
        </div>
      );
  }
}
