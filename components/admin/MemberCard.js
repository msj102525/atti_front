import React from 'react';
import { observer } from "mobx-react";

const MemberCard = observer(({ user, onDelete }) => {
    return (
        <tr>
            <td style={{ width: "5vw", textAlign: "center" }}>{user.userId}</td>
            <td style={{ textAlign: "left" }}>{user.userName}</td>
            <td style={{ width: "10vw", textAlign: "center" }}>{user.nickName}</td>
            <td style={{ width: "7vw", textAlign: "center" }}>{user.email}</td>
            
        </tr>
    );
});

export default MemberCard;