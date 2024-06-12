import React, { useState, ChangeEvent } from "react";
import "./CustomInput.css";

interface CustomInputProps {
  className?: string;
  placeholder: string;
  type: string;
  exportInputValue: (value: string) => void;
  disabled?: boolean;
  autoComplete?: string;
  spellCheck?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    className = "",
    exportInputValue,
    disabled = false,
    autoComplete = "off",
    spellCheck = false,
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!inputValue) {
      setIsFocused(false);
    }
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (exportInputValue !== undefined) {
      exportInputValue(e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div
      className={`input-holder ${isFocused || inputValue ? "focused" : ""} ${className}`}
    >
      <label>{props.placeholder}</label>
      <input
        type={props.type}
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        required
        className={`input ${isFocused || inputValue ? "input-focus" : ""}`}
        disabled={disabled}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
      />
      <div className="bottom-line"></div>
    </div>
  );
};

export default CustomInput;
