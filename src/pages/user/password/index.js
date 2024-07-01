import React, { useState } from 'react';
import { sendTempPassword, verifyTempPassword} from '@/api/user/find';
import MoveMainLogo from "@/components/common/MoveMainLogo";
import PassModal from '@/components/user/passmodel';
const PasswordFind = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [message, setMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      window.location.href = "/login";
    }
  };

  const handleSendTempPassword = async () => {
    try {
        const response = await sendTempPassword({ userName, email });
        setMessage(response.data.message);
        openModal();
    } catch (error) {
        console.error('Error response:', error.response ? error.response.data : error.message);
        setMessage('임시 비밀번호 전송에 실패했습니다.');
    }
};

  const handleVerifyTempPassword = async () => {
    try {
      const response = await verifyTempPassword({ userName, tempPassword });
      setMessage(response.data.message);
      openModal();
    } catch (error) {
      setMessage('임시 비밀번호 확인에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
      <MoveMainLogo />
      <div className="mt-10 text-2xl font-bold text-gray-800">
        <h2>비밀번호 찾기</h2>
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
            onClick={handleSendTempPassword}
            className="w-full px-4 py-2 mt-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            임시비밀번호 전송
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="tempPassword" className="block mb-1 text-sm font-semibold text-gray-800">
            임시비밀번호 입력
          </label>
          <input
            type="text"
            id="tempPassword"
            name="tempPassword"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
            value={tempPassword}
            onChange={(e) => setTempPassword(e.target.value)}
            placeholder="임시비밀번호를 입력하세요"
          />
          <button
            onClick={handleVerifyTempPassword}
            className="w-full px-4 py-2 mt-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            확인
          </button>
        </div>
        <div className="text-sm text-red-500">{message}</div>
      </div>
      <PassModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="비밀번호 찾기"
        content="비밀번호 찾기가 완료되었습니다."
        content2="로그인 페이지로 이동합니다."
        content3="비밀번호 변경은 마이페이지에서 가능합니다."
        imgUrl="password"
      />
    </div>
  );
};

export default PasswordFind;
