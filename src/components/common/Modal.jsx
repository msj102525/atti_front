import React from "react";
import ReactDOM from "react-dom";
import MintButton from "./MintButton";
import LottieAnimation from "./animation/LottieAnimation";
import fireworkAnimation from "@/components/animationData/firework.json";

const Modal = ({ isOpen, onClose, title, content, content2, imgUrl }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          {imgUrl ? (
            imgUrl === "signUp" ? (
              <LottieAnimation animationData={fireworkAnimation} />
            ) : (
              <img
                src={imgUrl}
                alt="Modal Image"
                className="object-cover w-24 h-24 rounded-lg shadow-lg"
              />
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
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
