import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import Modal from 'react-modal';
import styles from "../../styles/board/boardDetail.module.css"; // 스타일 파일을 임포트
import Header from '../common/Header';

Modal.setAppElement('#__next');

function NoticeDetail() {
    const [board, setBoard] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
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

    const handleBoardUpdateClick = () => {
        router.push(`/board/boardUpdate?boardNum=${boardNum}`);
    };

    const handleDeleteClick = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/board/boardDetail/${boardNum}`);
            closeModal();
            router.push("/board/boardList");
        } catch (error) {
            console.error("There was an error deleting the board!", error);
            closeModal();
        }
    };

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
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
                    <button className={styles.list} onClick={handleBoardListClick}>목록</button>
                    <button onClick={handleBoardUpdateClick}>수정</button>
                    <button onClick={handleDeleteClick}>삭제</button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Confirmation"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>삭제하시겠습니까?</h2>
                <div className={styles.modalButtons}>
                    <button onClick={confirmDelete}>확인</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </Modal>
        </div>
    );
}

export default NoticeDetail;
