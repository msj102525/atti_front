import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import instance from "@/api/axiosApi";
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
    

    useEffect(() => {
        if (boardNum) {
            const fetchBoardDetail = async () => {
                try {
                    const response = await instance.get(`/board/boardDetail/${boardNum}`);
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
            <Header />
            <div className={styles.container}>
                <h3 className={styles.h3}>{board.boardTitle}</h3>
                <span>{board.boardWriter}</span>
                <span>조회수 {board.readCount}</span>
                <span>중요도: {board.importance}</span>
                <span>Date: {board.boardDate.split(" ")[0]}</span>
                {board.fileUrl && (
                    <a href={`http://43.202.66.137:8080${board.fileUrl}`} download>
                        다운로드 <i className="fa fa-download"></i> 💾
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
            
        </div>
    );
}

export default NoticeDetail;
