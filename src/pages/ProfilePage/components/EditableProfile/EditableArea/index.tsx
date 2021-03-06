import React from "react";
import { useAppSelector, useAppDispatch } from "hooks";
import { investorProfileMapping } from "types/InvestorProfile";
import {
  selectFormData,
  selectPasswordConfirmationEqualsStatus,
  selectInvalidFieldsStatus,
  updatePassword,
  updateInvestorProfileDisplayText,
  updateInvestorProfileValue,
  updateName,
  updatePasswordConfirmation,
} from "slices/profileSlice";
import Input from "components/Input";
import SelectInput from "components/SelectInput";
import styles from "./style.module.css";

export default function EditableArea() {
  const { investorProfileDisplayText, name, password, passwordConfirmation } =
    useAppSelector(selectFormData);

  const {
    invalidInvestorProfile,
    invalidName,
    invalidPassword,
    invalidPasswordConfirmation,
  } = useAppSelector(selectInvalidFieldsStatus);

  const passwordEquals = useAppSelector(selectPasswordConfirmationEqualsStatus);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <Input
        value={name}
        onChange={(e) => dispatch(updateName(e.target.value))}
        style={{ marginBottom: 15 }}
        type="text"
        label="Nome"
        errorMode={invalidName}
        errorMessage="Campo obrigatório"
      />
      <SelectInput
        value={investorProfileDisplayText}
        onChange={(e) =>
          dispatch(updateInvestorProfileDisplayText(e.target.value))
        }
        onOptionSelected={(v) => dispatch(updateInvestorProfileValue(v))}
        style={{ marginBottom: 15 }}
        label="Perfil de Investidor"
        options={investorProfileMapping}
        errorMode={invalidInvestorProfile}
        errorMessage="Campo obrigatório"
      />
      <Input
        value={password}
        onChange={(e) => dispatch(updatePassword(e.target.value))}
        style={{ marginBottom: 15 }}
        type="password"
        label="Senha"
        errorMode={!passwordEquals || invalidPassword}
        errorMessage={
          invalidPassword && passwordEquals ? "Campo obrigatório" : undefined
        }
      />
      <Input
        value={passwordConfirmation}
        onChange={(e) => dispatch(updatePasswordConfirmation(e.target.value))}
        style={{ marginBottom: 15 }}
        type="password"
        label="Confirmar Senha"
        errorMode={!passwordEquals || invalidPasswordConfirmation}
        errorMessage={
          !passwordEquals
            ? "A senha e confirmação devem ser iguais"
            : "Campo obrigatório"
        }
      />
    </div>
  );
}
