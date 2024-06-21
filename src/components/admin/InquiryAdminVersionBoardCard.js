import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/inquiryAdminVersion.module.css";

 
 
const InquiryAdminVersionBoardCard = observer(({ user, handleDelete }) => {
    
    
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
            <td style={{ width: "8vw", textAlign: "center" }}>{user.userId}</td>
            <td style={{ width: "15vw",textAlign: "center" }}>{user.title}</td>
            <td style={{ width: "30vw", textAlign: "center" }}>{user.content}</td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    <button className={styles.button} onClick={() => handleDelete(user.inquiryNo)}>삭제</button>
            </td>
            
            
        </tr>
    );
});

export default InquiryAdminVersionBoardCard;