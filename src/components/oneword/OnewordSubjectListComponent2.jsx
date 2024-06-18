import React from 'react';
import { observer } from "mobx-react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const OnewordSubjectListComponent2 = observer(({ onewordsubject, onOnewordSubjectClick }) => {
    const relativeTime = (isoDate) => formatDistanceToNow(parseISO(isoDate), { addSuffix: true, locale: ko });

    const handleClick = () => {
        onOnewordSubjectClick(onewordsubject); //// 올바른 onewordsubject 객체를 전달하는지 확인
    };

    // const handleEditClick = () => {
    //     // Invoke the edit function passed from props
    //     onEditClick(onewordsubject);
    // };

    // owsjWriteDate를 Date 객체로 파싱하고, 포맷을 변경하여 표시
    const formattedDate = onewordsubject.owsjWriteDate
        ? new Date(onewordsubject.owsjWriteDate).toLocaleDateString('ko-KR')
        : '';

    return (
        <tr onClick={handleClick}>
            <td style={{ width: "5vw", textAlign: "center" }}>{onewordsubject.owsjNum}</td>
            <td style={{ textAlign: "left" }}>{onewordsubject.owsjSubject}</td>
            <td style={{ width: "10vw", textAlign: "center" }}>{onewordsubject.owsjWriter}</td>
            <td style={{ width: "10vw", textAlign: "center" }}>{formattedDate}</td>
            {/* 다음 열은 필요에 따라 주석 해제하여 사용 */}
            {/* <td style={{ width: "7vw", textAlign: "center" }}>{relativeTime(onewordsubject.owsjWriteDate)}</td> */}
        </tr>
    );
});

export default OnewordSubjectListComponent2;
