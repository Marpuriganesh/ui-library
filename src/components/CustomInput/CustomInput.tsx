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
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { className = "", exportInputValue, disabled = false,autoComplete="off",spellCheck=false } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (exportInputValue !== undefined) {
      exportInputValue(e.target.value);
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
