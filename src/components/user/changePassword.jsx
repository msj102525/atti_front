import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from "@/pages/stores/authStore";
import { changePassword } from '@/api/user/userApi';
import Modal2 from "@/components/common/Modal";

const ChangePassword = observer(() => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setModalMessage('비밀번호가 일치하지 않습니다.');
      setIsModalOpen(true);
      return;
    }

    try {
      await changePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
        userId: authStore.userId
      });
      setModalMessage('비밀번호가 변경되었습니다.');
    } catch (error) {
      setModalMessage('비밀번호 변경에 실패했습니다: ' + error.message);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>비밀번호 변경</h2>
      <div>
        <label>현재 비밀번호</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label>새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>비밀번호 변경</button>
      <Modal2 isOpen={isModalOpen} onClose={closeModal} title="알림" content={modalMessage} />
    </div>
  );
});

export default ChangePassword;
