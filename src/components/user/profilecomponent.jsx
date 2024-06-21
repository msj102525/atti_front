import React, { useState, useRef } from 'react';
import { uploadProfilePhoto } from '@/api/doctor/doctorUpdate';

const YourComponent = ({ authStore }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const fileInput = useRef(null);

  const uploadProfilePhoto = async (file, userId) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      const response = await fileUploadInstance.put("/file/upload", formData);
      return response.data;
    } catch (error) {
      console.error('업로드 오류:', error);
      throw error;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 미리보기 설정
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          authStore.setProfileUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);

      try {
        const userId = authStore.userId; // authStore에서 userId 가져오기
        const response = await uploadProfilePhoto(file, userId);
        const filePath = response.filePath;
        authStore.setProfileUrl(filePath);  
        setModalMessage('프로필 사진 업로드 완료!');
      } catch (error) {
        console.error('프로필 사진 업로드 오류:', error);
        setModalMessage(`프로필 사진 업로드 실패: ${error.message}`);
      }
      setIsModalOpen(true);
    }
  };

  const handleImageDelete = () => {
    authStore.setProfileUrl('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    setModalMessage('프로필 사진이 삭제되었습니다.');
    setIsModalOpen(true);
  };

  return (
    <div className="mb-4">
      <label htmlFor="profileUrl" className="block mb-1 text-sm font-semibold text-gray-800">프로필 사진:</label>
      <img 
        src={authStore.profileUrl.includes('http') ? authStore.profileUrl : serverImage + authStore.profileUrl}
        alt="Profile" 
        className="w-32 h-32 mb-2 rounded-full" 
      />
      <input
        type="file"
        id="profileUrl"
        name="profileUrl"
        style={{ display: 'none' }}
        accept="image/jpg,image/png,image/jpeg"
        onChange={handleFileChange}
        ref={fileInput}
      />
      <div className="flex justify-center mt-4">
        <button 
          type="button" 
          className="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full cursor-pointer" 
          onClick={() => fileInput.current.click()}
        >
          프로필 사진 선택
        </button>
        <button 
          type="button" 
          className="w-full px-4 py-2 font-bold text-white bg-red-400 rounded-full cursor-pointer" 
          onClick={handleImageDelete}
        >
          프로필 사진 삭제
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <p>{modalMessage}</p>
          <button onClick={() => setIsModalOpen(false)}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
