import React from "react";
import { Link } from "react-router-dom";

import Input from "components/Input";
import Button from "components/Button";
import Title from "components/Title";
import Checkbox from "components/Checkbox";

import Card from "../Card";

import style from "./style.module.css";

export default function RegisterCard() {
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
        <Input style={{ marginBottom: 15 }} type="email" label="Nome" />
        <Input
          style={{ marginBottom: 15 }}
          type="email"
          label="Perfil de Investidor"
        />
        <Input style={{ marginBottom: 15 }} type="email" label="Email" />
        <Input style={{ marginBottom: 15 }} type="password" label="Senha" />
        <Input
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
