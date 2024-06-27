import React, { useState, useEffect } from 'react';
import styles from '@/styles/admin/EditModal.module.css'; // 모달 스타일 파일
import { updateMember } from '@/api/admin/memberList'; // 회원 정보 수정 API 함수
 
const EditModal = ({ isOpen, onClose, user, onUpdate }) => {

    const { userId, userName, nickName, email } = user || {}; // user가 undefined인 경우를 대비하여 기본값 설정

    // 상태 초기화 및 업데이트 함수
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
   
    useEffect(() => {
        if (user) {
          setName(user.userName || '');
          setNickname(user.nickName || '');
          setUserEmail(user.email || '');
        }
      }, [user]);


  // 입력 값 변경 핸들러
  const handleNameChange = (e) => setName(e.target.value);
  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleEmailChange = (e) => setUserEmail(e.target.value);

  // 회원 정보 업데이트 핸들러
  const handleUpdate = async () => {
    setLoading(true); // 로딩 상태 설정

    try {
      // 회원 정보 업데이트 요청
      await updateMember(userId, {
        userName: name,
        nickName: nickname,
        email: userEmail,
      });
      // 부모 컴포넌트에 업데이트 완료를 알림
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('Error updating member:', error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    onClose(); // 모달 닫기
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Edit Member</h2>
            <div className={styles.content}>
              <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
              <label>
                Nickname:
                <input type="text" value={nickname} onChange={handleNicknameChange} />
              </label>
              <label>
                Email:
                <input type="email" value={userEmail} onChange={handleEmailChange} />
              </label>
            </div>
            <div className={styles.actions}>
              <button onClick={handleUpdate} disabled={loading}>Update</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;