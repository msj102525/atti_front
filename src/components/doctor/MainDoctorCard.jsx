import StarRating from "./StarRating";

export default function MainDoctorCard({
  profileUrl,
  name,
  introduce,
  doctorId,
  averageStarPoint,
}) {
  return (
    <div className="w-48 p-8 bg-white border border-gray-200 rounded-lg shadow-2xl">
      <div className="m-2">
        <img
          src={profileUrl ? profileUrl : "/doctor.png"}
          className="border border-gray-400 rounded-full"
        />
      </div>
      <div className="m-2 text-xl font-semibold">{name}</div>
      <div className="m-2 text-sm text-gray-600">{introduce}</div>
      <div className="pl-1">
        <StarRating starRating={averageStarPoint} />
      </div>
    </div>
  );
}
