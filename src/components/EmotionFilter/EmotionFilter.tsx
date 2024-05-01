import React, { ChangeEvent, useState } from "react";
import "./EmotionFilter.css";
import axios from "axios";
import { motion } from "framer-motion";

interface FeelingItem {
  id: number;
  feeling: string;
  created_at: string;
  updated_at: string;
}
interface Props {
  url: string;
}

const EmotionFilter: React.FC<Props> = ({ url }) => {
  const [inputValue, setInputValue] = useState("");
  const [pointer, setPointer] = useState<"none" | "stroke" | "auto">("none");
  const [feelings, setFeelings] = useState<FeelingItem[]>([]);

  const fetchEmotions = async (query: string): Promise<FeelingItem[]> => {
    try {
      const response = await axios.get(`${url}?q=${query}`);
      const resultsArray = response.data;
      return resultsArray;
    } catch (error) {
      console.error("Error fetching feelings:", error);
      throw error;
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();
    const lastCharacter = value.charAt(value.length - 1);
    if (lastCharacter === " ") {
      console.log("spacebar pressed");
      const feeling = feelings[0]?.feeling || "";
      setInputValue(feeling);
      return;
    }

    setInputValue(value);
    setFeelings([]);

    // Check if the updated value is empty
    if (value === "") {
      setFeelings([]); // Clear the feelings state
      return; // Exit early to avoid unnecessary API calls
    }
    // Call fetchEmotions with the updated input value
    fetchEmotions(value)
      .then((resultsArray) => {
        setFeelings(resultsArray);
        // console.log("feelings", resultsArray);
      })
      .catch((error) => {
        console.error("Error fetching emotions:", error);
      });
  }

  function handleOnFocus() {
    setPointer("stroke");
  }

  function handleOnBlur() {
    setFeelings([]);
    setPointer("none");
  }

  return (
    <>
      <div className="EmotionFilter">
        <span
          style={{
            color: inputValue.length > 0 ? "white" : "#ffffff62",
            userSelect: "none",
          }}
        >
          #
        </span>
        <div className="total_container">
          <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            onChange={handleChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={inputValue}
            placeholder={"feeling"}
          />
          <div className="inner_container" style={{ pointerEvents: pointer }}>
            {inputValue.length > 0 &&
              feelings.map((feeling, id) => (
                <motion.div className="item" key={id}>
                  <label>{feeling.feeling}</label>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmotionFilter;
