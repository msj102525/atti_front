import React from 'react';
import { observer } from "mobx-react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const OnewordSubjectListComponent = observer(({ onewordsubject, isPinned = false, onOnewordSubjectClick  }) => {
    const relativeTime = (isoDate) => formatDistanceToNow(parseISO(isoDate), { addSuffix: true, locale: ko });

    const date = onewordsubject.owsjWriteDate ? new Date(onewordsubject.owsjWriteDate) : null;

    // date 값이 있는 경우에만 포맷 처리하고, 없는 경우에는 공백 반환
    const formattedDate = date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : '';
    
    return (
        <tr onClick={onOnewordSubjectClick}>
            <td className="px-6 py-4 whitespace-no-wrap" style={{ width: "5vw", textAlign: "center" }}>{onewordsubject.owsjNum}</td>
            <td className="px-6 py-4 whitespace-no-wrap" style={{ textAlign: "left" }}>{onewordsubject.owsjSubject}</td>
            <td className="px-6 py-4 whitespace-no-wrap" style={{ width: "10vw", textAlign: "center" }}>{onewordsubject.owsjWriter}</td>
            <td className="px-6 py-4 whitespace-no-wrap" style={{ width: "10vw", textAlign: "center" }}>{formattedDate}</td>
        </tr>
    );
      
});

export default OnewordSubjectListComponent;
