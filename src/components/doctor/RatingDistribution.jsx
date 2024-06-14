import React from "react";

const RatingDistribution = ({ averageRating, ratingCounts }) => {
  const totalRatings = Object.values(ratingCounts).reduce((a, b) => a + b, 0);
  const getBarWidth = (count) => `${(count / totalRatings) * 100}%`;

  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-md">
      <div className="flex items-center w-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-8 h-8 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z"
          />
        </svg>
        <span className="ml-2 text-3xl font-semibold text-gray-800">
          {averageRating.toFixed(2)}
        </span>
        <span className="ml-1 text-lg text-gray-600">/5</span>
      </div>
      {Object.entries(ratingCounts)
        .reverse()
        .map(([star, count]) => (
          <div key={star} className="flex items-center mb-2">
            <span className="mr-2 text-gray-600">{star}</span>
            <div className="relative flex-1 h-4 bg-gray-200 rounded">
              <div
                className="h-full bg-teal-600 rounded"
                style={{ width: getBarWidth(count) }}
              />
            </div>
            <span className="ml-2 text-gray-600">{count}</span>
          </div>
        ))}
    </div>
  );
};

export default RatingDistribution;
