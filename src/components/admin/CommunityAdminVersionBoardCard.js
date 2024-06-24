import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/communityAdminVersion.module.css";

 
 
const CommunityAdminVersionBoardCard = observer(({ user, handleEdit, handleSuspend, handleDelete }) => {
    
    
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

    // 회원 정보 업데이트 처리 함수
    // const handleUpdate = async() => {
    //     // 업데이트 로직 구현
    //     // onUpdate 함수 호출
    //     if (!user) return;

    //     try {
    //         // 선택된 회원 정보 업데이트 요청
    //         await updateMember(user.userId, {
    //             name: user.userName,
    //             nickname: user.nickName,
    //             email: user.email
    //         });
    //         queryClient.invalidateQueries('memberList');
    //         closeEditModal(); // 모달 닫기
    //         onUpdate(); // 상태 업데이트
    //     } catch (error) {
    //         console.error("Error updating member:", error);
    //     }
    //     console.log(`Edit member with ID: ${user.userId}`);
    //     // 수정 로직 처리
    // };


    return (
        <tr>
            <td style={{ width: "8vw", textAlign: "center" }}>{user.userId}</td>
            <td style={{  width: "20vw",textAlign: "center" }}>
                <span className={styles.truncatedText}>{user.feedContent}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    <button className={styles.button} onClick={() => handleDelete(user.feedNum)}>삭제</button>
            </td>
            
            
        </tr>
    );
});

export default CommunityAdminVersionBoardCard;