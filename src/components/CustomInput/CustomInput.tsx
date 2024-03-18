import React, { useState, ChangeEvent } from 'react';
import './CustomInput.css';


interface CustomInputProps {
  className?: string;
  placeholder: string;
  type: string;
  exportInputValue:(value:string)=>void;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {

  const {className='',exportInputValue} = props
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

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
    if(exportInputValue!==undefined){
      exportInputValue(e.target.value)
    }
  };

  return (
    <div className={`input-holder ${isFocused || inputValue ? 'focused' : ''} ${className}`}>
      <label>{props.placeholder}</label>
      <input
        type={props.type}
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        className={`${isFocused || inputValue ? 'input-focus' : ''}`}
      />
      <div className='bottom-line'></div>
    </div>
  );
}

export default CustomInput;




