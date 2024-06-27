import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/memberList.module.css";
import EditModal from './EditModal';
import SuspendModal from './SuspendModal';
 
 
const MemberCard = observer(({ user, handleEdit, handleSuspend, handleDelete }) => {
    
    
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false); // 정지 모달 상태

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleSubmit = (postData) => openEditModal(postData);
    const openEditModal = (userData) => {
        setIsModalOpen(true); // 모달 열기
    };
    // 수정 모달 닫기
    const closeEditModal = () => {
        setIsModalOpen(false);
    };

    const openSuspendModal = () => setIsSuspendModalOpen(true);
    const closeSuspendModal = () => setIsSuspendModalOpen(false);


    return (
        <tr>
            <td style={{ width: "8vw", textAlign: "center" }}>
            <span className={styles.truncatedText}>{user.userId}</span>
            </td>
            <td style={{ width: "8vw", textAlign: "center" }}>
            <span className={styles.truncatedText2}>{user.userName}</span>
            </td>
            <td style={{ width: "8vw", textAlign: "center" }}>
            <span className={styles.truncatedText3}>{user.nickName}</span>
            </td>
            <td style={{ width: "15vw", textAlign: "center" }}>
            <span className={styles.truncatedText4}>{user.email}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    {/* <button className={styles.button} onClick={() => handleEdit(user.userId)}>수정</button> */}
                    <button className={styles.button} onClick={openEditModal}>수정</button>
                    <EditModal isOpen={isModalOpen} onClose={closeEditModal} user={user} />
                    {/* <EditModal isOpen={isModalOpen} onClose={closeEditModal} user={user} onUpdate={handleUpdate}/> */}
                    <button className={styles.button} onClick={openSuspendModal}>정지</button>
                    <SuspendModal isOpen={isSuspendModalOpen} onClose={closeSuspendModal} user={user} />
                    <button className={styles.button} onClick={() => handleDelete(user.userId)}>삭제</button>
            </td>
            
            
        </tr>
    );
});

export default MemberCard;