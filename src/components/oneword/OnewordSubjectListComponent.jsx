import React from 'react';
import { observer } from "mobx-react";
import styles from "@/styles/oneword/onewordsubjectAdmin.module.css";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const OnewordSubjectListComponent = observer(({ onewordsubject, onOnewordSubjectClick }) => {

    const relativeTime = (isoDate) => formatDistanceToNow(parseISO(isoDate), { addSuffix: true, locale: ko });

    const date = onewordsubject.owsjWriteDate ? new Date(onewordsubject.owsjWriteDate) : null;

    // date 값이 있는 경우에만 포맷 처리하고, 없는 경우에는 공백 반환
    const formattedDate = date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : '';

    return (
        <tr onClick={onOnewordSubjectClick}>
            <td style={{ width: "5vw", textAlign: "center" }}>{onewordsubject.owsjNum}</td>
            <td style={{ width: "30vw", textAlign: "left" }}>
                <span className={styles.truncatedText2}>{onewordsubject.owsjSubject}</span>
            </td>
            <td style={{ width: "5vw", textAlign: "center" }}>{onewordsubject.owsjWriter}</td>
            <td style={{ width: "5vw", textAlign: "center" }}>{formattedDate}</td>
        </tr>
    );

});

export default OnewordSubjectListComponent;
