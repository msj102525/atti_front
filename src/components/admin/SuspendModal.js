import React, { useState, useEffect } from 'react';
import styles from '@/styles/admin/SuspendModal.module.css'; // 기존 모달 스타일 재사용
import { suspendMember } from '@/api/admin/memberList'; // 회원 정지 API 함수

const SuspendModal = ({ isOpen, onClose, user }) => {
  const [title, setTitle] = useState('게시글 도배');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setTitle('게시글 도배');
      setContent('');
    }
  }, [user]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSuspend = async () => {
    setLoading(true);
    const suspensionData = {
      userId: user.userId,
      suspensionTitle: title || '게시글 도배', // title 값을 전송
      suspensionContent: content,
      suspensionStatus: 'unactive' 
    };
    console.log('Sending suspension data:', suspensionData); // 디버깅 메시지 추가
    try {
      await suspendMember(suspensionData);
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === "This user is already suspended.") {
        alert("이미 정지된 회원입니다.");
      } else {
      console.error('Error suspending member:', error);
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Suspend Member</h2>
            <div className={styles.content}>
              <label>
                Title:<br />
                <select value={title} onChange={handleTitleChange} className={styles.select}>
                  <option value="게시글 도배">게시글 도배</option>
                  <option value="비정상적인 이용">비정상적인 이용</option>
                  <option value="기타">기타</option>
                </select>
              </label >
              <label>
                Content:
                <textarea value={content} onChange={handleContentChange}></textarea>
              </label>
            </div>
            <div className={styles.actions}>
              <button onClick={handleSuspend} disabled={loading}>Suspend</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuspendModal;