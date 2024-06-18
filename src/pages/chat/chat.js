import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Test from '../chat/test';

const Chat = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  

  const handleStarClick = (value) => {
    setSelectedRating(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const submitRating = () => {
    if (selectedRating !== null) {
      alert(`Rating submitted: ${selectedRating}`);
    } else {
      alert('Please select a rating');
    }
  };

  

  
  
  return (
    <div>
      <Header />
      
      <div className="container flex justify-between mx-auto" >
        {/* 왼쪽 영역 */}
        <div className="h-screen w-1/2 pr-6 border-r border-black">
          <div className="flex justify-center items-center mb-6">
            <img alt="의사" src="../../doctor.png" width="300px" height="auto" className="border border-black" />
          </div>
          <hr className="border-t-10 border-black w-1/3 my-6 mx-4" />
          <div className="mx-4">
            <h2 className="text-xl mb-12">허 준 상담사님의 간단한 소개</h2>
            <div className="mb-6">
              <div className="text-2xl mr-4">👔</div>
              <div className="flex-1">
                <h3 className="text-2xl">경력</h3>
                <p className="ml-10 text-lg">유희춘의 병을 고침</p>
                <p className="ml-10 text-lg">선조 임금의 병을 고침</p>
                <p className="ml-10 text-lg">동의보감 저자</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-2xl mr-4">🎓</div>
              <div className="flex-1">
                <h3 className="text-2xl">학력</h3>
                <p className="ml-10 text-lg">성균관대학교 수석졸업</p>
              </div>
            </div>
          </div>
          <hr className="border-t-10 border-black w-1/3 my-6 mx-4" />
          <div className="text-center">
            <label className="text-lg mb-2 block">허 준 상담사님과의 상담은 어떠신가요?</label>
                <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label
                    key={ratingValue}
                    onMouseEnter={() => handleMouseEnter(ratingValue)}
                    onMouseLeave={handleMouseLeave}
                    >
                    <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    className="hidden"
                    onClick={() => handleStarClick(ratingValue)}
                    />
                <span className={`text-3xl cursor-pointer ${hoverRating >= ratingValue || selectedRating >= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`}>☆</span>
            </label>
                );
                })}
            </div>
                <textarea 
                    placeholder="간단한 한줄 평을 남겨주세요" 
                    className="w-full border border-gray-300 p-2 mb-4 rounded-lg h-24"
                />
                <button
                onClick={submitRating}
                className="bg-yellow-400 py-2 px-4 rounded-lg text-lg"
                >
                제출
                </button>
            </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-1/2 flex flex-col ">
          <Test/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
