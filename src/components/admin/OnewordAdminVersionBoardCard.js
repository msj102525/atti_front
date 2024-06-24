import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/onewordAdminVersion.module.css";

 
 
const OnewordAdminVersionBoardCard = observer(({ user, handleDelete }) => {
    
    return (
        <tr>
            <td style={{ width: "8vw", textAlign: "center" }}>{user.owsjWriter}</td>
            <td style={{ width: "30vw",textAlign: "center" }}>
            <span className={styles.truncatedText}>{user.owsjSubject}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    <button className={styles.button} onClick={() => handleDelete(user.owsjNum)}>삭제</button>
            </td>
        </tr>
    );
});

export default OnewordAdminVersionBoardCard;