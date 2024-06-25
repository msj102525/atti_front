import React from "react";
const StarRating = ({ starRating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < starRating ? "currentColor" : "none"}
          className={`w-6 h-6 text-yellow-500 ${
            index >= starRating ? "stroke-current" : ""
          }`}
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

export default StarRating;
