import React, { ChangeEvent, useState, useRef, useEffect } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [feelings, setFeelings] = useState<FeelingItem[]>([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", (event) => {
        if (event.key === " ") {
          event.preventDefault();
          console.log("SpaceBar key was pressed!");
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

    // Add a return statement here
    return undefined;
  }, []);

  const fetchEmotions = async (query: string): Promise<FeelingItem[]> => {
    try {
      const response = await axios.get(`${url}?q=${query}`);
      const resultsArray = response.data.results;
      // console.log(resultsArray); // Log the array of results

      return resultsArray; // Return the array of results
    } catch (error) {
      console.error("Error fetching feelings:", error);
      throw error; // Re-throw the error to propagate it further if needed
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();
    setInputValue(value);

    if (value.length > 0) {
      fetchEmotions(value)
        .then((resultsArray) => {
          setFeelings(resultsArray);
        })
        .catch((error) => {
          console.error("Error fetching emotions:", error);
          // Handle error if needed
        });
    } else {
      setFeelings([]);
    }
  }

  function handleOnFocus() {
    // console.log("focus");
    setPointer("stroke");
  }

  function handleOnBlur() {
    // console.log("blur");
    // console.log(feelings);
    setPointer("none");
  }

  return (
    <>
      <div className="EmotionFilter">
        <span
          style={{
            color: inputValue.length > 0 ? "white" : "#ffffff62",
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
            ref={inputRef}
            placeholder="feeling"
          />
          <div className="inner_container" style={{ pointerEvents: pointer }}>
            {feelings.map((feeling, id) => (
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
