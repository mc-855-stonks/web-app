import React, { useRef, useState, useEffect } from "react";

import { useKeyDown, useOutsideAlerter } from "hooks";

import Option from "./components/Option";

import style from "./style.module.css";

import dropIcon from "./imgs/drop.svg";

export interface OptionProp<T> {
  value: string;
  displayValue: T;
  displayValueString: string;
}

interface Props<T> {
  errorMode?: boolean;
  errorMessage?: string;
  label?: string;
  style?: React.CSSProperties;
  value?: string;
  options?: Array<OptionProp<T>>;
  onOptionSelected?: (value: string, displayValue: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function SelectInput<T>({
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
        options?.filter((it) => it.displayValueString === value) || [];
      if (onOptionSelected && filteredOption.length > 0) {
        onOptionSelected(
          filteredOption[0].value,
          filteredOption[0].displayValueString
        );
      }
    }
    valueRef.current = value || "";
  }, [value, options, onOptionSelected]);

  function onInputClick() {
    setVisibleOptions(true);
  }

  function onOptionSelectedHandler(v: string) {
    const option = options ? options.filter((it) => it.value === v) : [];
    if (onOptionSelected && option.length === 1) {
      onOptionSelected(v, option[0].displayValueString);
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
        it.displayValueString.toLowerCase().includes(trimmedValue || "")
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
