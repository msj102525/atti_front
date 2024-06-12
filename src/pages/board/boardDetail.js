import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import styles from "../../styles/board/boardDetail.module.css"; // 스타일 파일을 임포트
import Header from '../common/Header';

function NoticeDetail() {
    const [board, setBoard] = useState(null);
    const router = useRouter();
    const { boardNum } = router.query;

    useEffect(() => {
        if (boardNum) {
            const fetchBoardDetail = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/board/boardDetail/${boardNum}`);
                    setBoard(response.data);
                } catch (error) {
                    console.error("There was an error fetching the board detail!", error);
                }
            };

            fetchBoardDetail();
        }
    }, [boardNum]);

    const handleBoardListClick = () => {
        router.push("/board/boardList");
    };

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <h3 className={styles.h3}>{board.boardTitle}</h3>
                <span>{board.boardWriter}</span> 
                <span>조회수 {board.readCount}</span> 
                <span>중요도: {board.importance}</span> 
                <span>Date: {board.boardDate.split(" ")[0]}</span> 
                <hr />
                <div className={styles.contentbox}>{board.boardContent}</div>
                <hr />
                <div className={styles.btnbox}>
                    <button onClick={handleBoardListClick}>목록</button> 
                </div>
            </div>
        </div>
    );
}

export default NoticeDetail;
