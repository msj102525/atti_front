import MintButton from "../common/MintButton";
import { useState } from "react";
import StarRating from "../doctor/StarRating";
import styles from "@/styles/common/mintButton.module.css";
import EditableStarRating from "./EditableStarRating";
import { updateReview, deleteReview } from "@/api/doctor/review";
import Modal from "@/components/common/Modal";
import Link from "next/link";

export default function ConsultCard({
  doctor,
  doctorId,
  profileUrl,
  writeDate,
  starPoint,
  content,
  reviewId,
  setReviewInfoList,
  reviewInfoList,
}) {
  const [modifiedPage, setModifiedPage] = useState(true);
  const [modifiedContent, setModifiedContent] = useState(content);
  const [modifiedStarPoint, setModifiedStarPoint] = useState(starPoint);

  const [originalContent, setOriginalContent] = useState(content);
  const [originalStarPoint, setOriginalStarPoint] = useState(starPoint);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalImage, setModalImage] = useState("");
  const defaultImageUrl = "/doctor.png";

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = async () => {
    try {
      setIsDeleteModalOpen(false);
      const response = await deleteReview(reviewId);
      setModalMessage(response.data);
      openModal();
      setReviewInfoList(
        reviewInfoList.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      setIsDeleteModalOpen(false);
      setModalMessage(error.message);
      setModalImage("/common/fail.png");
      openModal();
    } finally {
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConsult = () => {
    console.log(doctorId);
  };

  const cancleDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleModify = async () => {
    const textareaData = document.getElementById(reviewId).value;
    setModifiedContent(textareaData);
    setOriginalContent(modifiedContent);
    setOriginalStarPoint(modifiedStarPoint);
    setModifiedPage(true);

    const reviewData = new FormData();
    reviewData.append("reviewId", reviewId);
    reviewData.append("rating", modifiedStarPoint);
    reviewData.append("review", textareaData);
    reviewData.append("receiverId", doctorId);

    try {
      const response = await updateReview(reviewData);
      setModalMessage(response.data);
      setModalImage("signUp");
      openModal();
    } catch (error) {
      setModalMessage(error.response.data);
      setModalImage("/common/fail.png");
      openModal();
    }
  };

  const handleModifyChange = () => {
    setModifiedPage(false);
  };

  const handleCancelModify = () => {
    setModifiedContent(originalContent);
    setModifiedStarPoint(originalStarPoint);
    setModifiedPage(true);
  };

  return (
    <div className="flex flex-col p-4 my-2 border-2 border-gray-300 md:flex-row">
      <div className="flex flex-col w-full p-2 mx-auto md:w-1/5">
        <div className="m-1 text-sm text-center md:text-base">{doctor}</div>
        <div className="flex justify-center">
          <img
            className="w-auto h-24 md:h-20"
            src={profileUrl ? profileUrl : "/doctor.png"}
            alt="Doctor's profile"
          />
        </div>
        <div className="flex items-center justify-center w-full h-10">
          <Link href={`/doctor/${doctorId}`} className="w-1/2 h-full">
            <MintButton
              onClick={handleConsult}
              text="상담신청"
              sizeW="w-full"
              fontSize="text-sm md:text-base"
              sizeH="h-full"
            />
          </Link>
        </div>
      </div>
      {modifiedPage ? (
        <div className="flex flex-col w-full p-2 m-2 mx-4 md:w-4/5">
          <div className="flex justify-between">
            <div className="m-1 text-lg">{writeDate}</div>
            <div className="flex items-center">
              <MintButton
                text="수정"
                sizeW="w-20"
                sizeH="h-8 md:h-12"
                onClick={handleModifyChange}
              />
              <button
                className={`ml-2 bg-red-500 hover:bg-red-600 text-white font-bold ${styles.roundedBetween} w-20 h-12`}
                onClick={openDeleteModal}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="m-2">
            <StarRating starRating={modifiedStarPoint} />
          </div>
          <div className="m-2 text-base md:text-xl">{modifiedContent}</div>
        </div>
      ) : (
        <div className="flex flex-col w-full p-4 m-2 border-2 border-gray-300 md:w-4/5">
          <div className="my-2">
            <EditableStarRating
              currentRating={modifiedStarPoint}
              setRating={setModifiedStarPoint}
            />
          </div>
          <div className="m-2">
            <textarea
              id={reviewId}
              className="w-full h-20 p-1 text-base md:text-xl"
              defaultValue={modifiedContent}
            />
          </div>
          <div className="flex items-end justify-end w-full h-full">
            <MintButton
              text="수정완료"
              sizeW="w-16 md:w-24"
              sizeH="h-8 md:h-12"
              onClick={handleModify}
            />
            <button
              className={`ml-2 bg-red-500 hover:bg-red-600 text-white font-bold ${styles.roundedBetween} w-16 md:w-24 h-8 md:h-12`}
              onClick={handleCancelModify}
            >
              취소
            </button>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalMessage}
        imgUrl={modalImage}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="리뷰 삭제"
        content="정말 삭제하시겠습니까?"
        cancleButton={true}
        onClickCancle={cancleDelete}
      />
    </div>
  );
}
