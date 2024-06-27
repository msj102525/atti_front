import React, {useState} from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/admin/communityAdminVersion.module.css";

 
 
const CommunityAdminVersionBoardCard = observer(({ user, handleDelete }) => {
    
    return (
        <tr>
            <td style={{ width: "8vw", textAlign: "center" }}>
                <span className={styles.truncatedText}>{user.userId}</span>
            </td>               
            <td style={{  width: "20vw",textAlign: "center" }}>
                <span className={styles.truncatedText2}>{user.feedContent}</span>
            </td>
            <td style={{ width: "20vw", textAlign: "center" }}>
                    <button className={styles.button} onClick={() => handleDelete(user.feedNum)}>삭제</button>
            </td>
            
            
        </tr>
    );
});

export default CommunityAdminVersionBoardCard;