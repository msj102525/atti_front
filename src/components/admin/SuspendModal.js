import React, { useState, useEffect } from 'react';
import styles from '@/styles/admin/SuspendModal.module.css'; // 기존 모달 스타일 재사용
import { suspendMember } from '@/api/admin/memberList'; // 회원 정지 API 함수

const SuspendModal = ({ isOpen, onClose, user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setTitle('');
      setContent('');
    }
  }, [user]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSuspend = async () => {
    setLoading(true);
    try {
      await suspendMember({
        userId: user.userId,
        suspensionTitle: title,
        suspensionContent: content,
      });
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('Error suspending member:', error);
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