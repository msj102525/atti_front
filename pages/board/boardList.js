import React, { useState } from 'react';
import styles from "../../styles/board/boardList.module.css"; // 스타일 파일을 임포트

function SearchForm() {
  const [selectedValue, setSelectedValue] = useState('');
  const [showDateInputs, setShowDateInputs] = useState(false);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setShowDateInputs(value === 'date');
  };

  return (
    <div className="searchdiv">
      <form action="nsearch.do" method="get">
        <select name="action" id="searchselect" onChange={handleSelectChange}>
          <option value="title">제목</option>
          <option value="writer">작성자</option>
          <option id="date" value="date">날짜</option>
        </select>
        {showDateInputs ? (
          <>
            <input type="date" name="begin" /> 
            <input type="date" name="end" /> 
          </>
        ) : (
          <input type="text" id="searchtext" name="keyword" placeholder="검색어 입력" />
        )}
        <input type="submit" className="searchbtn" value="검색" />
      </form>
      <button className="writerB" onClick={() => console.log('글쓰기 버튼 클릭')}>글쓰기</button>
    </div>
  );
}

export default function List() {
  return (
    <div>
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
          <tr>
            <td className={styles.td}>1</td>
            <td className={styles.td}>제목 예시</td>
            <td className={styles.td}>작성자 예시</td>
            <td className={styles.td}>날짜 예시</td>
            <td className={styles.td}>조회수 예시</td>
          </tr>
        </tbody>
      </table>
      <SearchForm />
    </div>
  );
}
