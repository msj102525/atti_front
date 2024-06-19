import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '@/pages/common/header';
import styles from '@/styles/user/mypage.module.css';
import Modal from "@/components/common/Modal";
import Footer from '@/pages/common/Footer';
import { getUserData, updateUser, deleteUser } from '@/api/user/userApi';
import { uploadProfilePhoto, updateProfilePhoto, deleteProfilePhoto } from '@/components/user/profilePhotoManager';
import { authStore } from "@/pages/stores/authStore";

export default function Mypage() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileUrl, setprofileUrl] = useState(null);
  const fileInput = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getUserData(token);

        setUserId(data.userId);
        console("userId")
        setName(data.userName);
        setNickname(data.nickName);
        setPassword(data.password);
        setEmail(data.email);
        setPhone(data.phone);
        setGender(data.gender);
        setBirthDate(data.birthDate);
        setProfileImage(data.profileImage);

        // authStore 및 localStorage 업데이트
        authStore.setUserId(data.userId);
        authStore.setUserName(data.userName);
        authStore.setNickName(data.nickName);
        authStore.setProfileUrl(data.profileImage);
        authStore.setUserType(data.userType);

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
        birthDate,
        profileImage
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
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setprofileUrl(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
  
      try {
        const userId = localStorage.getItem('userId'); // userId 가져오기
        const response = await uploadProfilePhoto(file, userId);
        setProfileImage(response.filePath);  // 서버에서 받은 파일 경로로 프로필 이미지 설정
        setModalMessage('프로필 사진 업로드 완료!');
      } catch (error) {
        console.error('프로필 사진 업로드 오류:', error);
        setModalMessage(`프로필 사진 업로드 실패: ${error.message}`);
      }
      setIsModalOpen(true);
    }
  };

  const handleImageDelete = async () => {
    try {
      await deleteProfilePhoto();
      setProfileImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
      setModalMessage('프로필 사진 삭제 완료!');
    } catch (error) {
      setModalMessage('프로필 사진 삭제 실패!');
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center h-screen p-4">
      <Header />
      <Head>
        <title>회원 정보 페이지</title>
      </Head>
      <div className="mt-10 font-bold text-gray-900">
        <h1>내 정보 수정</h1>
      </div>
      <div className="flex flex-col w-full max-w-md p-6 mt-5 overflow-y-auto bg-white rounded-lg shadow-md max-h-[70vh]">
        <div className="mb-4">
          <label htmlFor="profileImage" className="block mb-1 text-sm font-semibold text-gray-800">프로필 사진:</label>
          <img src={profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile" className="w-32 h-32 mb-2 rounded-full" />
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            style={{ display: 'none' }}
            accept="image/jpg,image/png,image/jpeg"
            onChange={handleFileChange}
            ref={fileInput}
          />
          <div className="flex justify-center mt-4">
            <button type="button" className="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full cursor-pointer" onClick={() => fileInput.current.click()}>프로필 사진 선택</button>
            <button type="button" className="w-full px-4 py-2 font-bold text-white bg-red-400 rounded-full cursor-pointer" onClick={handleImageDelete}>프로필 사진 삭제</button>
          </div>
        </div>
        
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
