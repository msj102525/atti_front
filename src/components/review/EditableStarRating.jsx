import React, { useState } from "react";

const EditableStarRating = ({ currentRating, setRating }) => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const totalStars = 5;

  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleMouseEnter = (index) => {
    setHoveredStar(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={
            index < (hoveredStar !== null ? hoveredStar : currentRating)
              ? "currentColor"
              : "none"
          }
          className={`w-9 h-9 text-yellow-500 cursor-pointer ${
            index >= (hoveredStar !== null ? hoveredStar : currentRating)
              ? "stroke-current"
              : ""
          }`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z"
          />
        </svg>
      ))}
    </div>
  );
};

export default EditableStarRating;
