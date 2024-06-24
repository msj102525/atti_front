import React from "react";
import ReactDOM from "react-dom";
import MintButton from "./MintButton";
import LottieAnimation from "./animation/LottieAnimation";
import fireworkAnimation from "@/components/animationData/firework.json";
import styles from "@/styles/common/mintButton.module.css";

const Modal = ({
  isOpen,
  onClose,
  title,
  content,
  content2,
  imgUrl,
  cancleButton = false,
  onClickCancle = () => {},
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          {imgUrl ? (
            imgUrl === "signUp" ? (
              <LottieAnimation animationData={fireworkAnimation} />
            ) : (
              <img src={imgUrl} alt="Modal Image" className="w-24 h-24" />
            )
          ) : null}
        </div>

        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">
          {title}
        </h2>
        <div className="mb-6 text-center text-gray-600">
          <p>{content}</p>
          <p>{content2}</p>
        </div>
        <div className="flex justify-center">
          <MintButton
            onClick={onClose}
            text="확인"
            sizeW="w-24"
            sizeH="h-10"
            fontSize="text-lg"
          />
          {cancleButton && (
            <button
              className={`ml-8 w-24 h-10 text-lg font-bold text-white bg-red-500 hover:bg-red-600 ${styles.roundedBetween} `}
              onClick={onClickCancle}
            >
              취소
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
