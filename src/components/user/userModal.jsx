import React from "react";
import ReactDOM from "react-dom";

const Modalsns = ({ isOpen, onClose, title, content, content2 ,onConfirm = () => {} }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          className="absolute text-gray-600 top-4 right-4 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-semibold">
          {title}
        </h2>
        <div className="mb-6 text-center text-gray-600">
          <p>{content}</p>
          <p>{content2}</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modalsns;
