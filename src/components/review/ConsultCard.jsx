import MintButton from "../common/MintButton";
import { useState } from "react";
import StarRating from "../doctor/StarRating";
import styles from "@/styles/common/mintButton.module.css";
import EditableStarRating from "./EditableStarRating";

export default function ConsultCard({
  doctor,
  doctorId,
  profileUrl,
  writeDate,
  starPoint,
  content,
  reviewId,
}) {
  const [modifiedPage, setModifiedPage] = useState(true);
  const [modifiedContent, setModifiedContent] = useState(content);
  const [modifiedStarPoint, setModifiedStarPoint] = useState(starPoint);

  // Store original values to revert back to on cancel
  const [originalContent, setOriginalContent] = useState(content);
  const [originalStarPoint, setOriginalStarPoint] = useState(starPoint);

  const handleConsult = () => {
    console.log(doctorId);
  };

  const handleModifyChange = () => {
    setOriginalContent(modifiedContent);
    setOriginalStarPoint(modifiedStarPoint);
    setModifiedPage(false);
  };

  const handleModify = () => {
    const textarea = document.getElementById(reviewId);
    setModifiedContent(textarea.value);
    setModifiedPage(true);
  };

  const handleDelete = () => {
    // Implement delete logic
  };

  const handleCancelModify = () => {
    // Revert to original values
    setModifiedContent(originalContent);
    setModifiedStarPoint(originalStarPoint);
    setModifiedPage(true);
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-1/6 p-2 mx-auto my-4 border-2 border-gray-300">
        <div className="m-2 text-center">{doctor}</div>
        <div className="flex justify-center">
          <img
            className="w-auto h-32"
            src={profileUrl}
            alt="Doctor's profile"
          />
        </div>
        <div className="flex items-center justify-center w-full h-16">
          <MintButton
            onClick={handleConsult}
            text="상담신청"
            sizeW="w-2/3"
            fontSize="text-base"
            sizeH="h-2/3"
          />
        </div>
      </div>
      {modifiedPage ? (
        <div className="flex flex-col w-2/3 p-4 m-4 border-2 border-gray-300">
          <div className="flex justify-between">
            <div className="m-4 text-2xl">{writeDate}</div>
            <div>
              <MintButton
                text="수정"
                sizeW="w-24"
                sizeH="h-12"
                onClick={handleModifyChange}
              />
              <button
                className={`ml-2 bg-red-500 hover:bg-red-600 text-white font-bold ${styles.roundedBetween} w-24 h-12`}
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="m-4">
            <StarRating starRating={modifiedStarPoint} />
          </div>
          <div className="m-4 text-xl">{modifiedContent}</div>
        </div>
      ) : (
        <div className="flex flex-col w-2/3 p-8 m-4 border-2 border-gray-300">
          <div className="my-8">
            <EditableStarRating
              currentRating={modifiedStarPoint}
              setRating={setModifiedStarPoint}
            />
          </div>
          <div>
            <textarea
              id={reviewId}
              className="w-full h-auto text-xl"
              defaultValue={modifiedContent}
            />
          </div>
          <div className="flex items-end justify-end w-full h-full">
            <MintButton
              text="수정완료"
              sizeW="w-24"
              sizeH="h-12"
              onClick={handleModify}
            />
            <button
              className={`ml-2 bg-red-500 hover:bg-red-600 text-white font-bold ${styles.roundedBetween} w-24 h-12`}
              onClick={handleCancelModify}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
