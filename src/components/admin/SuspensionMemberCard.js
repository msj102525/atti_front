import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/suspensionMemberList.module.css";

 
 
const SuspensionMemberCard = observer(({ user, handleDelete }) => {
    
    
    return (
        <tr>
            <td style={{ width: "8vw", textAlign: "center" }}>
            <span className={styles.truncatedText}>{user.userId}</span>
            </td>
            <td style={{ width: "8vw",textAlign: "center" }}>{user.suspensionTitle}</td>
            <td style={{ width: "15vw", textAlign: "center" }}>
            <span className={styles.truncatedText2}>{user.suspensionContent}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    <button className={styles.button} onClick={() => handleDelete(user.suspensionNo)}>정지해제</button>
            </td>
            
            
        </tr>
    );
});

export default SuspensionMemberCard;