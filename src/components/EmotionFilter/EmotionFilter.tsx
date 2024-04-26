import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import "./EmotionFilter.css";

const EmotionFilter: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [pointer, setPointer] = useState<"none" | "stroke" | "auto">("none");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          console.log("Tab key was pressed!");
          setInputValue("apple");
          // Perform your desired action here
        }
      });

      const input = inputRef.current;

      return () => {
        input.removeEventListener("keydown", () => {
          console.log("event listener removed");
        });
      };
    }
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
  }

  function handleOnFocus() {
    console.log("focus");
    setPointer("stroke");
  }

  function handleOnBlur() {
    console.log("blur");
    setPointer("none");
  }

  return (
    <>
      <div className="EmotionFilter">
        <div className="total_container">
          <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            onChange={handleChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={inputValue}
            ref={inputRef}
          />
          <div className="inner_container" style={{ pointerEvents: pointer }}>
            <div className="item">
              <label>apple</label>
            </div>
            <div className="item">
              <label>ball</label>
            </div>
            <div className="item">
              <label>cat</label>
            </div>
            <div className="item">
              <label>dog</label>
            </div>
            <div className="item">
              <label>elephant</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmotionFilter;
