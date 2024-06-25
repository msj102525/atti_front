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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    const fetchData = async (page = 0) => {
      try {
        const params = {
          page: page,
          size: 10,
        };

        if (searchQuery.action) {
          params.action = searchQuery.action;
          params.keyword = searchQuery.keyword;
          params.beginDate = searchQuery.beginDate;
          params.endDate = searchQuery.endDate;
        }

        const response = await axios.get("http://localhost:8080/board/search", {
          params: params,
        });

        const data = response.data.content;

        // 모든 중요도 2인 항목에 ⭐ 표시
        const updatedBoards = data.map(board => ({
          ...board,
          boardTitle: `${board.importance === 2 ? '⭐ ' : ''}${board.boardTitle}${board.filePath ? ' 💽' : ''}`
        
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
  }, [currentPage, searchQuery]);

  const handleRowClick = (boardNum) => {
    router.push(`/board/boardDetail?boardNum=${boardNum}`);
  };

  useEffect(() => {
    console.log(boards, "ㅋㅌㅊㅋㅌㅊㅋㅌㅊ");
  }, [boards]);

  const handleSearchSubmit = async (formData) => {
    try {
      const params = {
        action: formData.action,
        keyword: formData.keyword,
        beginDate: formData.beginDate,
        endDate: formData.endDate,
        page: 0,  // 원하는 페이지 번호 (예: 첫 페이지)
        size: 10  // 한 페이지에 보여줄 항목 수
      };

      
      console.log(searchQuery, "ㅋㅌㅊ")

      setSearchQuery(formData);
      setCurrentPage(0);  // 검색 후 첫 페이지로 이동
      
      const response = await axios.get("http://localhost:8080/board/search", {
          params: params
      });
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
      console.error("There was an error fetching the search results!", error);
    }
  };

  const handlePageChange = async ({ selected }) => {
    try {
      const params = {
        action: searchQuery.action,
        keyword: searchQuery.keyword,
        beginDate: searchQuery.beginDate,
        endDate: searchQuery.endDate,
        page: selected,
        size: 10,
      };

      console.log(searchQuery, '페이지이동')

      const response = await axios.get("http://localhost:8080/board/search", {
        params: params,
      });
      const data = response.data.content;
      
      console.log(response.data)

      const updatedBoards = data.map(board => ({
        ...board,
        boardTitle: board.importance === 2 ? `⭐ ${board.boardTitle}` : board.boardTitle
        
      }));

      // 모든 항목을 boardNum 기준으로 정렬
      const finalBoards = updatedBoards.sort((a, b) => b.boardNum - a.boardNum);

      console.log(finalBoards)

      // 최종 데이터 설정
      setBoards(finalBoards);
      console.log(boards)
      setCurrentPage(selected);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error("There was an error fetching the search results!", error);
    }
  };

  const move = () => {
    router.push('/board/boardList');  // 버튼 클릭 시 이동할 페이지 경로를 지정합니다.
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
              <td className={styles.td}>{board.boardDate.substring(0, 10)}</td>
              <td className={styles.td}>{board.readCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <SearchForm onSubmit={handleSearchSubmit} />
      
      <Pagination 
        pageCount={pageCount} 
        onPageChange={handlePageChange} 
        currentPage={currentPage} 
      />
    </div>
  );
};

export default List;
