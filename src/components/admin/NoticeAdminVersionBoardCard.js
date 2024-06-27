import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/noticeAdminVersion.module.css";
import { useRouter } from "next/router";
 
 
const NoticeAdminVersionBoardCard = observer(({ user, handleDelete }) => {
    
    const router = useRouter();

    const handleRowClick = (boardNum) => {
        router.push(`/board/boardDetail?boardNum=${boardNum}`);
      };

    const handleBoardUpdateClick = (boardNum) => {
        router.push(`/board/boardUpdate?boardNum=${boardNum}`);
    };
    
    return (
        <tr key={user.boardNum}  >
            
            <td style={{ width: "15vw", textAlign: "center" }}>
                <span  className={styles.truncatedText2} onClick={() => handleRowClick(user.boardNum)}>{user.boardTitle}</span>
            </td>
            {/* <td style={{ width: "30vw", textAlign: "center" }}>{user.boardContent}</td> */}
            <td style={{ width: "30vw", textAlign: "center" }}>
                <span className={styles.truncatedText3} onClick={() => handleRowClick(user.boardNum)}>{user.boardContent}</span>
            </td>
            <td style={{ width: "8vw", textAlign: "center" }} onClick={() => handleRowClick(user.boardNum)}>
                <span  className={styles.truncatedText} onClick={() => handleRowClick(user.boardNum)}>{user.boardWriter}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    <button className={styles.button} onClick={() => handleBoardUpdateClick(user.boardNum)}>수정</button>
                    <button className={styles.button} onClick={() => handleDelete(user.boardNum)}>삭제</button>
            </td>
            
            
        </tr>
    );
});

export default NoticeAdminVersionBoardCard;