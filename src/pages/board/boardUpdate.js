import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from "../../styles/board/boardUpdate.module.css"; // 스타일 파일을 임포트
import Header from '../common/Header';// Header 경로 수정

const BoardUpdate = () => {
    const router = useRouter();
    const { boardNum } = router.query;

    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const [importance, setImportance] = useState(1);

    useEffect(() => {
        if (boardNum) {
            
            const fetchBoardDetail = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/board/boardDetail/${boardNum}`);
                    const board = response.data;
                    setBoardTitle(board.boardTitle);
                    setBoardContent(board.boardContent);
                    setImportance(board.importance);
                } catch (error) {
                    console.error("There was an error fetching the board detail!", error);
                }
            };

            fetchBoardDetail();
        }
    }, [boardNum]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/board/boardUpdate/${boardNum}`, {
                boardTitle: boardTitle,
                boardContent: boardContent,
                importance: importance
            });
            router.push(`/board/boardDetail?boardNum=${boardNum}`);
        } catch (error) {
            console.error("There was an error updating the board!", error);
        }
    };

    const handleCheckboxChange = (event) => {
        setImportance(event.target.checked ? 2 : 1);
    };

    return (
        <div>
            <Header />
            <div className="main-container" style={{ paddingTop: '100px' }}>
                <div className={styles.container}>
                    <hr />
                    <form id="modifyForm" onSubmit={handleSubmit}>
                        <input
                            className={styles.titleInput}
                            type="text"
                            name="boardTitle"
                            maxLength="44"
                            value={boardTitle}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            required
                        />
                        <hr />
                        <textarea
                            className={styles.contentbox}
                            name="boardContent"
                            rows="20"
                            cols="20"
                            maxLength="254"
                            value={boardContent}
                            onChange={(e) => setBoardContent(e.target.value)}
                            required
                        />
                        <hr />
                        <input type="hidden" name="page" value="1" />
                        <input type="hidden" name="boardNum" value={boardNum} />
                        <hr />
                        <label style={{ width: '100px' }}>
                            <p>중요도:</p>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                name="importance"
                                checked={importance === 2}
                                onChange={handleCheckboxChange}
                            />O
                        </label>
                        <br />
                        <button type="submit" className={styles.mv}>수정하기</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" onClick={() => router.push(`/board/boardDetail/${boardNum}`)} className={styles.mv}>돌아가기</button>
                    </form>
                </div>
            </div>
            <br />
            <hr />
        </div>
    );
};

export default BoardUpdate;
