import React from "react";
import { Link } from "react-router-dom";

import Input from "components/Input";
import Button from "components/Button";
import Title from "components/Title";

import Card from "../Card";

import style from "./style.module.css";

export default function LoginCard() {
  return (
    <div className={style.container}>
      <Card>
        <span className={style.register}>
          Ainda não possui uma conta?{" "}
          <Link to="/register" className={style.link}>
            Crie sua conta
          </Link>
        </span>
        <Title style={{ marginBottom: 24, marginRight: "auto" }}>
          Acesse sua conta.
        </Title>
        <Input style={{ marginBottom: 15 }} type="email" label="Email" />
        <Input style={{ marginBottom: 24 }} type="password" label="Senha" />
        <Link to="/register" className={style["forgot-password-link"]}>
          Esqueceu sua senha?
        </Link>
        <Button value="ENTRAR" />
      </Card>
    </div>
  );
}
