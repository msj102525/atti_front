import React from "react";
import StarRating from "./StarRating";
const ReviewCard = ({ userName, starPoint, content }) => {
  return (
    <div className="w-full h-full p-4 bg-white border rounded-lg shadow-md">
      {userName != null ? (
        <div className="mb-2 text-lg font-bold">{userName} 님의 후기</div>
      ) : (
        <div className="mb-2 text-2xl font-bold text-gray-400">
          탈퇴한 회원입니다.
        </div>
      )}
      <StarRating starRating={starPoint} />
      <p className="mt-4 text-xl text-gray-700">{content}</p>
    </div>
  );
};

export default ReviewCard;
