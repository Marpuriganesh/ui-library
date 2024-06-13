/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./Spinner.css";

const Spinner: React.FC<{
  count?: number;
  speed?: number;
  center_radius?: number;
  className?: string;
}> = ({ count = 8, speed = 0.7, center_radius = 16, className = "" }) => {
  const divs = Array.from(
    { length: count },
    (
      _,
      i // Or use spread syntax: [...Array(count)]
    ) => (
      <div
        key={i}
        className="spinner_line"
        style={{
          transform: `rotate(${(i * 360) / count}deg) translate(${center_radius}px) rotate(-90deg)`,
          animation: `spinner ${speed}s ease-in-out infinite`,
          animationDelay: `${(i / count) * speed}s`,
        }}
      /> // Empty div or customize content
    )
  );
  return (
    <>
      <div className={`spinner_container ${className}`}>
        <div className="spinner">{divs}</div>
      </div>
    </>
  );
};

export default Spinner;
