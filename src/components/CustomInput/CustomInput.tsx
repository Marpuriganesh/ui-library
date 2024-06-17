import React, { useState, ChangeEvent, forwardRef } from "react";
import "./CustomInput.css";
import { Spinner } from "../Spinner";

type AutocompleteType =
  | "on" // Enables browser autofill suggestions
  | "off" // Disables browser autofill suggestions
  | "one-time-code" // Suggest one-time code
  | "name" // Suggest full names or parts of names
  | "honorific-prefix" // Suggest honorific prefixes
  | "given-name" // Suggest first names
  | "additional-name" // Suggest middle names
  | "family-name" // Suggest last names
  | "honorific-suffix" // Suggest honorific suffixes
  | "username" // Suggest usernames
  | "new-password" // Disable suggestions for new password fields
  | "email" // Suggest email addresses
  | "url" // Suggest URLs
  | "tel" // Suggest phone numbers
  | "address" // Suggest addresses
  | "organization" // Suggest organizations
  | "street-address" // Suggest street addresses
  | "address-line1" // Suggest first line of address
  | "address-line2" // Suggest second line of address
  | "address-level1" // Suggest first level of address (e.g., country)
  | "address-level2" // Suggest second level of address (e.g., state)
  | "address-level3" // Suggest third level of address (e.g., city)
  | "postal-code" // Suggest postal codes
  | "cc-number" // Disable suggestions for credit card numbers (security)
  | "cc-exp" // Disable suggestions for credit card expiration dates (security)
  | "cc-csc" // Disable suggestions for credit card security codes (security)
  | "current-password"
  | "transaction-currency" // Suggest transaction currencies
  | "language" // Suggest languages
  | "search"; // Enable suggestions for search fields

interface CustomInputProps {
  className?: string;
  placeholder?: string;
  type?: string;
  exportInputValue?: (value: string) => void;
  disabled?: boolean;
  autoComplete?: AutocompleteType;
  spellCheck?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  loading?: boolean;
  initialValue?: string;
  name?: string;
  required?: boolean;
  minlength?: number;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      className = "",
      exportInputValue,
      disabled = false,
      autoComplete = "off",
      spellCheck = false,
      type = "text",
      placeholder = "Input",
      loading = false,
      initialValue = "",
      name = "",
      required = true,
      minlength,
    } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(initialValue);

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
        <label>
          {placeholder}
          {loading && (
            <Spinner
              center_radius={14}
              count={12}
              speed={1}
              className="input_spinner"
            />
          )}
        </label>
        <input
          type={type}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          required={required}
          className={`input ${isFocused || inputValue ? "input-focus" : ""}`}
          disabled={disabled}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
          name={name}
          ref={ref}
          minLength={minlength}
        />
        <div className="bottom-line"></div>
      </div>
    );
  }
);

export default CustomInput;
