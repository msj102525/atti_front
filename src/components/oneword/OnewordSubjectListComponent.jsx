import React from 'react';
import { observer } from "mobx-react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const OnewordSubjectListComponent = observer(({ onewordsubject, isPinned = false, onNoticeClick  }) => {
    const relativeTime = (isoDate) => formatDistanceToNow(parseISO(isoDate), { addSuffix: true, locale: ko });

    const date = onewordsubject.owsjWriteDate ? new Date(onewordsubject.owsjWriteDate) : null;

    // date 값이 있는 경우에만 포맷 처리하고, 없는 경우에는 공백 반환
    const formattedDate = date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : '';
    
    return (
        <tr onClick={onNoticeClick} style={{ background: isPinned ? "skyblue" : "none" }}>
            {/* <td style={{ width: "5vw", textAlign: "center" }}>{isPinned ? "공지" : "일반"}</td> */}
            <td style={{ width: "5vw", textAlign: "center" }}>{onewordsubject.owsjNum}</td>
            <td style={{ textAlign: "left" }}>{onewordsubject.owsjSubject}</td>
            <td style={{ width: "10vw", textAlign: "center" }}>{onewordsubject.owsjWriter}</td>
            {/* <td style={{ width: "10vw", textAlign: "center" }}>{formattedDate}</td> */}
            <td style={{ width: "10vw", textAlign: "center" }}>{formattedDate}</td>
            {/* <td style={{ width: "7vw", textAlign: "center" }}>{relativeTime(onewordsubject.owsjWriteDate)}</td> */}
        </tr>
    );
});

export default OnewordSubjectListComponent;
