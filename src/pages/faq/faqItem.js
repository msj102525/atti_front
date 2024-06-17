import React from 'react';

const FAQItem = ({ question, answer, isOpen, onToggle, onEdit, onDelete }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full text-left focus:outline-none"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold text-gray-900 flex justify-between">
          {question}
          <span>{isOpen ? '-' : '+'}</span>
        </h3>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-700">
          <p>{answer}</p>
          <div className="mt-4">
            <button 
              className="text-blue-500 hover:underline mr-4"
              onClick={onEdit}
            >
              수정
            </button>
            <button 
              className="text-red-500 hover:underline"
              onClick={onDelete}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
