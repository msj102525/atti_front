import React from "react";

const Button = ({ onClick, text, color }) => {
  const baseStyles = "font-bold py-2 px-4 rounded-lg text-white";

  const colorStyles = {
    green: "bg-teal-400 hover:bg-teal-500",
    red: "bg-red-500 hover:bg-red-700",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${colorStyles[color]}`}>
      {text}
    </button>
  );
};

export default Button;
