import React, { useRef, useState, useEffect } from "react";

import { useKeyDown, useOutsideAlerter } from "hooks";

import Option from "./components/Option";

import style from "./style.module.css";

import dropIcon from "./imgs/drop.svg";

export interface DisplayValue {
  toString: () => string;
}

export interface OptionProp<T extends DisplayValue> {
  value: string;
  displayValue: T;
}

interface Props<T extends DisplayValue> {
  errorMode?: boolean;
  errorMessage?: string;
  label?: string;
  style?: React.CSSProperties;
  value?: string;
  options?: Array<OptionProp<T>>;
  onOptionSelected?: (v: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function SelectInput<T extends DisplayValue>({
  errorMode,
  errorMessage,
  label,
  style: propStyle,
  value,
  options,
  onChange,
  onOptionSelected,
}: Props<T>) {
  const [visibleOptions, setVisibleOptions] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, () => {
    setVisibleOptions(false);
  });

  useKeyDown("Escape", () => {
    setVisibleOptions(false);
  });

  const valueRef = useRef("");
  useEffect(() => {
    if (valueRef.current !== value) {
      const filteredOption =
        options?.filter((it) => it.displayValue.toString() === value) || [];
      if (onOptionSelected && filteredOption.length > 0) {
        onOptionSelected(filteredOption[0].value);
      }
    }
    valueRef.current = value || "";
  }, [value, options, onOptionSelected]);

  function onInputClick() {
    setVisibleOptions(true);
  }

  function onOptionSelectedHandler(v: string) {
    if (onOptionSelected) {
      onOptionSelected(v);
    }
    setVisibleOptions(false);
  }

  function filteredOptions(): Array<OptionProp<T>> {
    const trimmedValue = value?.trim().toLowerCase();
    if (trimmedValue === "") {
      return options || [];
    }

    const result =
      options?.filter((it) =>
        it.displayValue
          .toString()
          .toLowerCase()
          .includes(trimmedValue || "")
      ) || [];

    return result;
  }

  return (
    <div className={style.container} style={propStyle}>
      <div className={style.label}>{label}</div>
      <div ref={wrapperRef}>
        <div className={style["input-container"]}>
          <input
            onClick={onInputClick}
            value={value}
            type="text"
            style={errorMode ? { border: `1px solid #C12B29` } : {}}
            onChange={onChange}
          />
          <img src={dropIcon} alt="" className={style["drop-icon"]} />
        </div>
        {visibleOptions && (
          <div style={{ width: "100%" }}>
            <div className={style["options-container"]}>
              {filteredOptions().map((it) => (
                <Option
                  onOptionSelected={onOptionSelectedHandler}
                  value={it.value}
                  displayValue={it.displayValue}
                  key={it.value}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {errorMessage && errorMode && (
        <div className={style.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

SelectInput.defaultProps = {
  errorMode: false,
  errorMessage: "",
  label: "",
  style: {},
  value: "",
  options: "",
  onOptionSelected: () => {},
  onChange: () => {},
};
