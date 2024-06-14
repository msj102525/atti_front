import React from "react";
import StarRating from "./StarRating";
const ReviewCard = ({ userName, starPoint, content }) => {
  return (
    <div className="w-full h-full p-4 bg-white border rounded-lg shadow-md">
      <div className="mb-2 text-lg font-bold">{userName} 님의 후기</div>
      <StarRating starRating={starPoint} />
      <p className="mt-4 text-gray-700">{content}</p>
    </div>
  );
};

export default ReviewCard;
