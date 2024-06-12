import React from 'react';
import { observer } from "mobx-react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const OnewordSubjectListComponent = observer(({ onewordsubject, isPinned = false, onNoticeClick  }) => {
    const relativeTime = (isoDate) => formatDistanceToNow(parseISO(isoDate), { addSuffix: true, locale: ko });

    return (
        <tr onClick={onNoticeClick} style={{ background: isPinned ? "skyblue" : "none" }}>
            {/* <td style={{ width: "5vw", textAlign: "center" }}>{isPinned ? "공지" : "일반"}</td> */}
            <td style={{ textAlign: "left" }}>{onwordsubject.subject}</td>
            <td style={{ width: "10vw", textAlign: "center" }}>{onwordsubject.writer}</td>
            <td style={{ width: "10vw", textAlign: "center" }}>{onwordsubject.write_date}</td>
            {/* <td style={{ width: "7vw", textAlign: "center" }}>{relativeTime(notice.createdAt)}</td> */}
        </tr>
    );
});

export default OnewordSubjectListComponent;
