import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { authStore } from "@/pages/stores/authStore";
import { snsUserUpdate, getUserData, deleteUser } from '@/api/user/userApi';
import Modal2 from "@/components/common/Modal2";
import MoveMainLogo from '@/components/common/MoveMainLogo';
import styles from '@/styles/user/snsInfo.module.css';
import unlinkKakaoAccount from '@/components/user/kakkaoDelet';
import unlinkNaverAccount from '@/components/user/naverDelet';
import { uploadProfilePhoto, deleteProfilePhoto } from '@/api/doctor/doctorUpdate';

const SnsInfoUP = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false); // Update success state
  const router = useRouter();
  const [profileUrl, setProfileUrl] = useState(null);
  const fileInput = useRef(null);

  const serverImage = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getUserData(token);

        authStore.setUserId(data.userId);
        authStore.setUserName(data.userName);
        authStore.setNickName(data.nickName);
        authStore.setEmail(data.email);
        authStore.setProfileUrl(data.profileUrl);
        authStore.setUserType(data.userType);
        authStore.setGender(data.gender);
        authStore.setPhone(data.phone);
        authStore.setLoginType(data.loginType);
        setProfileUrl(data.profileUrl);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const result = await snsUserUpdate(authStore);
      localStorage.setItem('userId', authStore.userId);
      localStorage.setItem('userName', authStore.userName);
      localStorage.setItem('nickName', authStore.nickName);
      localStorage.setItem('phone', authStore.phone);
      localStorage.setItem('gender', authStore.gender);
      localStorage.setItem('birthDate', authStore.birthDate);
      localStorage.setItem('profileUrl', authStore.profileUrl);
      localStorage.setItem('email', authStore.email);
      setModalMessage('정보가 성공적으로 업데이트되었습니다.');
      setIsModalOpen(true);
      setIsUpdateSuccess(true); // Set success state to true
    } catch (error) {
      console.error(error);
      setModalMessage('정보 업데이트에 실패했습니다.');
      setIsModalOpen(true);
      setIsUpdateSuccess(false); // Set success state to false
    }
  };

  const handleCancel = async () => {
    if (confirm('탈퇴 하시겠습니까?')) {
      let unlinkSuccess = false;
      if (authStore.loginType === 'kakao') {
        unlinkSuccess = await unlinkKakaoAccount(authStore.userId);
      } else if (authStore.loginType === 'naver') {
        unlinkSuccess = await unlinkNaverAccount(authStore.userId);
      }

      if (unlinkSuccess) {
        try {
          await deleteUser(authStore.userId);
          window.localStorage.clear();
          setModalMessage('탈퇴 완료!');
          setIsModalOpen(true);
          setIsUpdateSuccess(true); // Set success state to true for cancel
        } catch (error) {
          console.error(error);
          setModalMessage('탈퇴 실패!');
          setIsModalOpen(true);
          setIsUpdateSuccess(false); // Set success state to false
        }
      } else {
        setModalMessage(`${authStore.loginType === 'kakao' ? '카카오' : '네이버'} 연결 끊기 실패!`);
        setIsModalOpen(true);
        setIsUpdateSuccess(false); // Set success state to false
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isUpdateSuccess) {
      router.push('/'); // Redirect to main page if update or cancel was successful
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);

      try {
        const userId = authStore.userId; // authStore에서 userId 가져오기
        const response = await uploadProfilePhoto(file, userId);
        const filePath = response.profileUrl; // 서버에서 profileUrl로 받기
        authStore.setProfileUrl(filePath);
        setProfileUrl(filePath);
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
      const userId = authStore.userId; // authStore에서 userId 가져오기
      await deleteProfilePhoto(userId);
      authStore.setProfileUrl("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
      setProfileUrl(null);
      setModalMessage('프로필 사진 삭제 완료!');
    } catch (error) {
      console.error('프로필 사진 삭제 오류:', error);
      setModalMessage('프로필 사진 삭제 실패!');
    }
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <MoveMainLogo />
      <div className={styles.header}>
        <h1>소셜 마이페이지</h1>
      </div>
      <div className={styles.formContainer}>
        <form>
          <div className="mb-4">
            <label htmlFor="profileUrl" className="block mb-1 text-sm font-semibold text-gray-800">프로필 사진:</label>
            <img src={profileUrl ? serverImage + profileUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile" className="w-32 h-32 mb-2 rounded-full" />
            <input
              type="file"
              id="profileUrl"
              name="profileUrl"
              style={{ display: 'none' }}
              accept="image/jpg,image/png,image/jpeg"
              onChange={handleFileChange}
              ref={fileInput}
            />
            <div className="flex justify-center mt-4 space-x-4"> {/* 버튼 간 간격 추가 */}
              <button type="button" className="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full cursor-pointer" onClick={() => fileInput.current.click()}>프로필 사진 선택</button>
              <button type="button" className="w-full px-4 py-2 font-bold text-white bg-red-400 rounded-full cursor-pointer" onClick={handleImageDelete}>프로필 사진 삭제</button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="userName" className={styles.label}>성명:</label>
            <input type="text" id="userName" name="userName" className={styles.inputField} value={authStore.userName} onChange={(e) => authStore.setUserName(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nickName" className={styles.label}>닉네임:</label>
            <input type="text" id="nickName" name="nickName" className={styles.inputField} value={authStore.nickName} onChange={(e) => authStore.setNickName(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>전화번호:</label>
            <input type="tel" id="phone" name="phone" className={styles.inputField} value={authStore.phone} onChange={(e) => authStore.setPhone(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>성별:</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" id="male" name="gender" value="M" checked={authStore.gender === 'M'} onChange={(e) => authStore.setGender(e.target.value)} />
                남
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" id="female" name="gender" value="F" checked={authStore.gender === 'F'} onChange={(e) => authStore.setGender(e.target.value)} />
                여
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="birthDate" className={styles.label}>생년월일:</label>
            <input type="date" id="birthDate" name="birthDate" className={styles.inputField} value={authStore.birthDate} onChange={(e) => authStore.setBirthDate(e.target.value)} />
          </div>
          <div className="flex justify-center space-x-4">
            <button type="button" className={styles.submitButton} onClick={handleUpdate}>등록</button>
            <button type="button" className="w-full px-4 py-2 font-bold text-white bg-red-400 rounded-full cursor-pointer" onClick={handleCancel}>탈퇴</button>
          </div>
        </form>
      </div>
      <Modal2 isOpen={isModalOpen} onClose={closeModal} title="알림" content={modalMessage} />
    </div>
  );
});

export default SnsInfoUP;
