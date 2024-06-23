import React, { useState } from 'react';
import { UserIdFind } from '@/api/user/find';
import MoveMainLogo from "@/components/common/MoveMainLogo";
import Modal from "@/components/common/Modal";

const UserIdFindPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (typeof window !== 'undefined') {
      window.location.href = "/login";
    }
  };

  const handleSendUserId = async () => {
    try {
      const response = await UserIdFind({ userName, email });
      setMessage(response.data.message);
      openModal();
    } catch (error) {
      console.error('Error sending user ID:', error.response ? error.response.data : error.message);
      setMessage('아이디 전송에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
      <MoveMainLogo />
      <div className="mt-10 text-2xl font-bold text-gray-800">
        <h2>아이디 찾기</h2>
      </div>
      <div className="flex flex-col w-full max-w-md p-6 mt-5 overflow-y-auto bg-white rounded-lg shadow-md max-h-[70vh]">
        <div className="mb-4">
          <label htmlFor="userName" className="block mb-1 text-sm font-semibold text-gray-800">
            이름 입력
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-800">
            이메일 입력
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
          <button
            onClick={handleSendUserId}
            className="w-full px-4 py-2 mt-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            아이디 전송
          </button>
        </div>
        <div className="text-sm text-red-500">{message}</div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="아이디 찾기"
        content="아이디 찾기가 완료되었습니다."
        content2="로그인 페이지로 이동합니다."
        imgUrl="userid"
      />
    </div>
  );
};

export default UserIdFindPage;
