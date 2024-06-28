import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/inquiryAdminVersion.module.css";

 
 
const InquiryAdminVersionBoardCard = observer(({ user, handleDelete }) => {
    
    
    return (
        <tr>
            <td style={{ width: "10vw", textAlign: "center" }}>
                <span className={styles.truncatedText}>{user.userId}</span>
            </td>
            <td style={{ width: "15vw",textAlign: "center" }}>
                <span className={styles.truncatedText2}>{user.title}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                <span className={styles.truncatedText3}>{user.content}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    <button className={styles.button} onClick={() => handleDelete(user.inquiryNo)}>삭제</button>
            </td>
            
            
        </tr>
    );
});

export default InquiryAdminVersionBoardCard;