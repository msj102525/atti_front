import React from 'react';
import styles from "../../styles/board/boardDetail.module.css"; // 스타일 파일을 임포트
import { useRouter } from "next/router";

function NoticeDetail({ notice, currentPage }) {

    const router = useRouter();

    const handleBoardListClick = () => {
    router.push("/board/boardList");
  };
  
  return (
    <div className={styles.container}>
      <div className="container">
        <h3 className={styles.h3}>공지사항 제목</h3>
        <span>공지사항 작성자</span> 
        <span>조회수 15</span> 
        <span>중요도:15</span> 
        <span>Date:24/06/07</span> 
        <hr />
        <div className={styles.contentbox}>내용</div>
        <hr />
        <div className={styles.btnbox}>
            <button onClick={handleBoardListClick}>목록으로</button> 
        </div>
      </div>
    </div>
  );
}

export default NoticeDetail;
