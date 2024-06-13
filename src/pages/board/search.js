import React, { useState } from 'react';
import styles from "../../styles/board/search.module.css";
import MintButton from "@/components/common/MintButton"; 

const SearchForm = ({ onSubmit }) => {
  const [action, setAction] = useState('title');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      action,
      beginDate,
      endDate,
      keyword,
    };
    onSubmit(formData);
  };

  return (
    <div className={styles.searchdiv}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <select
          className={styles.searchSelect}
          name="action"
          id="searchselect"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="writer">작성자</option>
          <option value="date">날짜</option>
        </select>
        {action === 'date' ? (
          <>
            <input
              type="date"
              name="begin"
              value={beginDate}
              onChange={(e) => setBeginDate(e.target.value)}
              className={styles.dateInput}
            />
            <input
              type="date"
              name="end"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.dateInput}
            />
          </>
        ) : (
          <input
            type="text"
            id="searchtext"
            name="keyword"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={styles.searchText}
          />
        )}
        <MintButton
          onClick={handleSubmit}
          text="검색"
          sizeW="w-24"
          sizeH="h-12"
          fontSize="text-lg"
        />
      </form>
    </div>
  );
};

export default SearchForm;
