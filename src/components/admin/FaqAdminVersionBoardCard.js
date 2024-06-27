import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/faqAdminVersion.module.css";

 
 
const NoticeAdminVersionBoardCard = observer(({ user, handleDelete }) => {
    
    return (
        <tr>
            <td style={{ width: "15vw",textAlign: "center" }}>
                <span className={styles.truncatedText}>{user.faqTitle}</span>
            </td>
            <td style={{ width: "30vw", textAlign: "center" }}>
                <span className={styles.truncatedText2}>{user.faqContent}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    <button className={styles.button} onClick={() => handleDelete(user.faqNum)}>삭제</button>
            </td>
            
        </tr>
    );
});

export default NoticeAdminVersionBoardCard;