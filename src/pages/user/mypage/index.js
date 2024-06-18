import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/pages/common/header';
import styles from '@/styles/user/mypage.module.css';
import Modal from "@/components/common/Modal";
import Footer from '@/pages/common/Footer';
import { updateUser, deleteUser} from '@/api/user/userApi';

export default function Mypage() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/user');
        const data = await response.json();

        setUserId(data.userId);
        setName(data.userName);
        setNickname(data.nickName);
        setPassword(data.password);
        setEmail(data.email);
        setPhone(data.phone);
        setGender(data.gender);
        setBirthDate(data.birthDate);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        userId,
        name,
        nickname,
        password,
        email,
        phone,
        gender,
        birthDate
      };
      await updateUser(updatedUser);
      setModalMessage('수정 완료!');
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      setModalMessage('수정 실패!');
      setIsModalOpen(true);
    }
  };

  const handleCancel = async () => {
    if (confirm('탈퇴 하시겠습니까?')) {
      try {
        await deleteUser(userId);
        setModalMessage('탈퇴 완료!');
        setIsModalOpen(true);
      } catch (error) {
        console.error(error);
        setModalMessage('탈퇴 실패!');
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
      <Header />
      <Head>
        <title>회원 정보 페이지</title>
      </Head>
      <div className="mt-10 text-2xl font-bold text-gray-900">
        <h1>내 정보 수정 (일반 회원)</h1>
      </div>
      <div className="flex flex-col w-full max-w-md p-6 mt-5 overflow-y-auto bg-white rounded-lg shadow-md max-h-[70vh]">
        <form className={styles.form}>
          <div className="mb-4">
            <label htmlFor="userId" className="block mb-1 text-sm font-semibold text-gray-800">아이디:</label>
            <input type="text" id="userId" name="userId" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400" value={userId} readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="userName" className="block mb-1 text-sm font-semibold text-gray-800">성명:</label>
            <input type="text" id="userName" name="userName" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400" value={name} readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="nickName" className="block mb-1 text-sm font-semibold text-gray-800">닉네임:</label>
            <input type="text" id="nickName" name="nickName" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400" value={nickname} readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-800">비밀번호:</label>
            <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400" value={password} readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-800">이메일:</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400" value={email} readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1 text-sm font-semibold text-gray-800">전화번호:</label>
            <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-800">성별:</label>
            <div>
              <input type="radio" id="male" name="gender" value="M" checked={gender === 'M'} onChange={(e) => setGender(e.target.value)} />
              <label htmlFor="male" className="mr-2">남</label>
              <input type="radio" id="female" name="gender" value="F" checked={gender === 'F'} onChange={(e) => setGender(e.target.value)} />
              <label htmlFor="female">여</label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="birthDate" className="block mb-1 text-sm font-semibold text-gray-800">생년월일:</label>
            <input type="date" id="birthDate" name="birthDate" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div className="flex justify-center">
            <button type="button" className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer" onClick={handleUpdate}>수정</button>
            <button type="button" className="w-full px-4 py-2 font-bold text-white bg-red-400 rounded-full cursor-pointer" onClick={handleCancel}>탈퇴</button>
          </div>
        </form>
      </div>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} title="알림" content={modalMessage} />
    </div>
  );
}
