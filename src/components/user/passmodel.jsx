import React from "react";
import ReactDOM from "react-dom";
import MintButton from "../common/MintButton";
import LottieAnimation from "../common/animation/LottieAnimation";
import fireworkAnimation from "@/components/animationData/firework.json";

const PassModal = ({ isOpen, onClose, title, content, content2, content3, imgUrl }) => {
  if (!isOpen) return null;

  const renderImage = () => {
    if (imgUrl) {
      if (imgUrl === "signUp") {
        return <LottieAnimation animationData={fireworkAnimation} />;
      } else {
        return (
          <img
            src={imgUrl}
            alt="Modal"
            className="object-cover w-24 h-24 rounded-lg shadow-lg"
          />
        );
      }
    }
    return null;
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          {renderImage()}
        </div>

        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">
          {title}
        </h2>
        <div className="mb-6 text-center text-gray-600">
          <p>{content}</p>
          <p>{content2}</p>
          {content3 && <p>{content3}</p>}
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

export default PassModal;
