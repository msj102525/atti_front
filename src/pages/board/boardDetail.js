import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import Modal from 'react-modal';
import styles from "../../styles/board/boardDetail.module.css"; // 스타일 파일을 임포트
import Header from '../common/Header';
import Mintbutton from "@/components/common/MintButton"; 


Modal.setAppElement('#__next');

function NoticeDetail() {
    const [board, setBoard] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();
    const { boardNum } = router.query;
    const [userType, setUserType] = useState(''); // 유저 타입 상태 추가

    useEffect(() => {
        const fetchUserType = async () => {
          try {
            const response = await axios.get('http://localhost:8080/users/type'); // 유저 타입을 가져오는 API
            setUserType(response.data.userType);
          } catch (error) {
            console.error('Error fetching user type:', error);
          }
        };
    
        fetchUserType();
      }, []);

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
                    <Mintbutton
                        onClick={handleBoardListClick}
                        text="목록"
                        sizeW="w-24"
                        sizeH="h-12"
                        fontSize="text-lg"
                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {userType === 'A' && (
                    <Mintbutton
                        onClick={handleBoardUpdateClick}
                        text="수정"
                        sizeW="w-24"
                        sizeH="h-12"
                        fontSize="text-lg"
                    />
                    )}
                    {userType === 'A' && (
                    <Mintbutton
                        onClick={handleDeleteClick}
                        text="삭제"
                        sizeW="w-24"
                        sizeH="h-12"
                        fontSize="text-lg"
                    />
                    )}
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
                    <Mintbutton
                    onClick={confirmDelete}
                    text="확인"
                    sizeW="w-24"
                    sizeH="h-12"
                    fontSize="text-lg"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Mintbutton
                    onClick={closeModal}
                    text="취소"
                    sizeW="w-24"
                    sizeH="h-12"
                    fontSize="text-lg"
                    />
                </div>
            </Modal>
        </div>
    );
}

export default NoticeDetail;
