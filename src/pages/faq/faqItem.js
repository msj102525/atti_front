import React from 'react';

const FAQItem = ({ question, answer, isOpen, onToggle, onEdit, onDelete, isAdmin }) => {
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
          
        </div>
      )}
    </div>
  );
};

export default FAQItem;
