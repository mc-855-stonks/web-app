import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "hooks";

import {
  updateEmail,
  updatePassword,
  selectEmail,
  selectPassword,
} from "slices/loginSlice";

import Input from "components/Input";
import Button from "components/Button";
import Title from "components/Title";

import Card from "../Card";

import styleLogin from "./style.module.css";
import stylePage from "../../style.module.css";
import login from "../../../../utils/login";

export default function LoginCard() {
  const email = useAppSelector(selectEmail);
  const password = useAppSelector(selectPassword);
  const dispatch = useAppDispatch();

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
        />
        <Input
          style={{ marginBottom: 24 }}
          value={password}
          type="password"
          label="Senha"
          onChange={(e) => dispatch(updatePassword(e.target.value))}
        />
        <Link to="/register" className={styleLogin["forgot-password-link"]}>
          Esqueceu sua senha?
        </Link>
        <Button value="ENTRAR" onClick={() => login(email, password)} />
      </Card>
    </div>
  );
}
