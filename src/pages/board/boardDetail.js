import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import Modal from 'react-modal';
import styles from "../../styles/board/boardDetail.module.css"; // 스타일 파일을 임포트
import Header from '../common/Header';
import MintButton from "@/components/common/MintButton"; 

Modal.setAppElement('#__next');

function NoticeDetail() {
    const [board, setBoard] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();
    const { boardNum } = router.query;
    const userType = localStorage.getItem('userType'); // 유저 타입 상태 추가

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
                <br />
                {board.fileUrl && (
                    
                        <a href={board.fileUrl} download>
                        다운로드 : 💽
                        </a>
                    
                )}
                <hr />
                <div className={styles.contentbox}>{board.boardContent}</div>
                
                <hr />
                <div className="flex space-x-4">
                    <MintButton
                        onClick={handleBoardListClick}
                        text="목록"
                        sizeW="w-24"
                        sizeH="h-12"
                        fontSize="text-lg"
                        className="mr-4"
                    />
                    
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
                <div className="flex space-x-4">
                    <MintButton
                        onClick={confirmDelete}
                        text="확인"
                        sizeW="w-24"
                        sizeH="h-12"
                        fontSize="text-lg"
                        className="mr-4"
                    />
                    <MintButton
                        onClick={closeModal}
                        text="취소"
                        sizeW="w-24"
                        sizeH="h-12"
                        fontSize="text-lg"
                        className="mr-4"
                    />
                </div>
            </Modal>
        </div>
    );
}

export default NoticeDetail;
