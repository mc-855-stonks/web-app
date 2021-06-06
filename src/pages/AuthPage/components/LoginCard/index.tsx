import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "hooks";

import {
  updateEmail,
  updatePassword,
  selectEmail,
  selectPassword,
  selectStatus,
  login,
  clearForm,
} from "slices/loginSlice";

import { getUserSessionId } from "utils/userSession";

import Input from "components/Input";
import Button from "components/Button";
import Title from "components/Title";

import Card from "../Card";
import styleLogin from "./style.module.css";
import stylePage from "../../style.module.css";

export default function LoginCard() {
  const email = useAppSelector(selectEmail);
  const password = useAppSelector(selectPassword);
  const status = useAppSelector(selectStatus);
  const errorMode = status === "error";
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearForm());
    };
  }, [dispatch]);

  if (status === "success" && getUserSessionId()) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={styleLogin.container}>
      <Card>
        <span className={styleLogin.register}>
          Ainda não possui uma conta?{" "}
          <Link to="/register" className={styleLogin.link}>
            Crie sua conta
          </Link>
        </span>
        <Title className={stylePage.title}>Acesse sua conta.</Title>
        <Input
          style={{ marginBottom: 15 }}
          type="email"
          label="Email"
          value={email}
          onChange={(e) => dispatch(updateEmail(e.target.value))}
          errorMode={errorMode}
        />
        <Input
          style={{ marginBottom: 24 }}
          value={password}
          type="password"
          label="Senha"
          onChange={(e) => dispatch(updatePassword(e.target.value))}
          errorMode={errorMode}
          errorMessage="Email ou senha não correspondem a um usuário cadastrado"
        />
        <Link to="/register" className={styleLogin["forgot-password-link"]}>
          Esqueceu sua senha?
        </Link>
        <Button value="ENTRAR" onClick={() => dispatch(login())} />
      </Card>
    </div>
  );
}
