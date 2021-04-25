import React from "react";

import Input from "components/Input";
import Button from "components/Button";
import Title from "components/Title";

import Card from "../Card";

import style from "./style.module.css";

export default function LoginCard() {
  return (
    <div className={style.container}>
      <Card>
        <Title>Acesse sua conta.</Title>
        <Input type="email" label="Email" />
        <Input type="password" label="Senha" />
        <a href="/register" className={style.link}>
          Esqueceu sua senha?
        </a>
        <Button value="ENTRAR" />
      </Card>
    </div>
  );
}
