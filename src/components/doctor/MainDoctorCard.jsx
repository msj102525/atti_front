import StarRating from "./StarRating";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MainDoctorCard({
  profileUrl,
  name,
  introduce,
  doctorId,
  averageStarPoint,
}) {
  const [imgSrc, setImgSrc] = useState("" + profileUrl);
  // const handleError = () => {
  //   setImgSrc("/doctor.png");
  // };
  const serverImage = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const handleClick = () => {
    router.push(`/doctor/${doctorId}`);
  };

  return (
    <div
      className="w-48 p-8 bg-white border border-gray-200 rounded-lg shadow-2xl hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="h-24 m-2">
        <img
          src={imgSrc ? serverImage + imgSrc.toString() : "/doctor.png"}
          className="rounded-full"
          // onError={handleError}
        />
      </div>
      <div className="flex items-center justify-center h-12 m-2 text-xl font-semibold">
        {name}
      </div>
      <div className="h-12 m-2 text-sm text-gray-600">{introduce}</div>
      <div className="flex items-center justify-center h-8 pl-1">
        <StarRating starRating={averageStarPoint} />
      </div>
    </div>
  );
}
