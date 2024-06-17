import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "@/components/common/page";  // Pagination 컴포넌트 임포트
import styles from "../../styles/board/boardList.module.css";
import Header from '../common/Header';
import SearchForm from "./search";
import Mintbutton from "@/components/common/MintButton"; 

const List = () => {
  const [boards, setBoards] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [userType, setUserType] = useState(''); // 유저 타입 상태 추가
  const router = useRouter();

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
    const fetchData = async (page = 0) => {
      try {
        const response = await axios.get("http://localhost:8080/board/boardList", {
          params: {
            page: page,
            size: 10,
          },
        });
        console.log('API 응답 데이터:', response.data);

        // 응답 데이터
        const data = response.data.content;

        // 모든 중요도 2인 항목에 ⭐ 표시
        const updatedBoards = data.map(board => ({
          ...board,
          boardTitle: board.importance === 2 ? `⭐ ${board.boardTitle}` : board.boardTitle
        }));

        // 모든 항목을 boardNum 기준으로 정렬
        const finalBoards = updatedBoards.sort((a, b) => b.boardNum - a.boardNum);

        // 최종 데이터 설정
        setBoards(finalBoards);
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

  const handleSearchSubmit = async (formData) => {
    try {
      const response = await axios.get("http://localhost:8080/board/search", {
        params: formData
      });
      const data = response.data;
      // 모든 중요도 2인 항목에 ⭐ 표시
      const updatedBoards = data.map(board => ({
        ...board,
        boardTitle: board.importance === 2 ? `⭐ ${board.boardTitle}` : board.boardTitle
      }));

      // 모든 항목을 boardNum 기준으로 정렬
      const finalBoards = updatedBoards.sort((a, b) => b.boardNum - a.boardNum);

      // 최종 데이터 설정
      setBoards(finalBoards);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error("There was an error fetching the search results!", error);
    }
  };

  return (
    <div>
      <Header />
      <h1 className={styles.h1}>공지사항</h1>
      <Mintbutton />
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
              <td className={styles.td}>{board.boardTitle}</td>
              <td className={styles.td}>{board.boardWriter}</td>
              <td className={styles.td}>{board.boardDate.split(" ")[0]}</td>
              <td className={styles.td}>{board.readCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SearchForm onSubmit={handleSearchSubmit} userType={userType} />
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
};

export default List;
