import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "@/components/common/page";  // Pagination 컴포넌트 임포트
import styles from "../../styles/board/boardList.module.css";
import Header from '../common/Header';

const List = () => {
  const [boards, setBoards] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (page = 0) => {
      try {
        const response = await axios.get("http://localhost:8080/board/boardList", {
          params: {
            page: page,
            size: 10,
          },
        });
        console.log('API 응답 데이터:', response.data);
        setBoards(response.data.content);
        setPageCount(response.data.totalPages);
      } catch (error) {
        console.error("There was an error fetching the board list!", error);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleRowClick = (boardNum) => {
    router.push(`/board/boardDetail?boardNum=${boardNum}`);
  };

  return (
    <div>
      <Header />
      <h1>공지사항</h1>
      
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>번호</th>
            <th className={styles.th}>제목</th>
            <th className={styles.th}>작성자</th>
            <th className={styles.th}>날짜</th>
            <th className={styles.th}>조회수</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {boards.map((board) => (
            <tr key={board.boardNum} onClick={() => handleRowClick(board.boardNum)} className={styles.row}>
              <td className={styles.td}>{board.boardNum}</td>
              <td className={styles.td}>{board.importance === 2 ? `⭐ ${board.boardTitle}` : board.boardTitle}</td>
              <td className={styles.td}>{board.boardWriter}</td>
              <td className={styles.td}>{board.boardDate.split(" ")[0]}</td>
              <td className={styles.td}>{board.readCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
};

export default List;
