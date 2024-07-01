import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import Pagination from "@/components/common/page";
import styles from "@/styles/inquiry/inquiryList.module.css";
import Header from '../common/Header';
import InquirySearchForm from "@/components/inquiry/inquirySearchForm";
import MintButton from "@/components/common/MintButton";
import { getInquiryList, searchInquiries } from "@/api/inquiry/inquiry";
import { authStore } from "../stores/authStore";

const InquiryList = observer(() => {
  const [inquiries, setInquiries] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const loggedIn = authStore.loggedIn; // 로그인 상태 확인

  const fetchData = async (page = 0, formData = null) => {
    try {
      const data = formData ? await searchInquiries(formData) : await getInquiryList(page);

      console.log('API 응답 데이터:', data);

      // 응답 데이터
      const inquiryNo = data.content;

      // 모든 항목을 inquiryDate 기준으로 오름차순 정렬
      const finalInquiries = inquiryNo.sort((a, b) => new Date(a.inquiryDate) - new Date(b.inquiryDate));

      // 최종 데이터 설정
      setInquiries(finalInquiries);
      setPageCount(data.totalPages);
    } catch (error) {
      console.error("There was an error fetching the inquiry list!", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleRowClick = (inquiryNo) => {
    router.push(`/inquiry/inquiryDetail?inquiryNo=${inquiryNo}`);
  };

  const handleSearchSubmit = (formData) => {
    fetchData(0, formData);
    setCurrentPage(0);
  };

  const handleCreateInquiryClick = () => {
    router.push('/inquiry/inquiryWrite'); // 문의사항 작성 페이지로 이동
  };

  return (
    <div>
      <Header />
      <h1 className={styles.h1}>문의사항</h1>
      {loggedIn && ( // 로그인 상태일 때만 버튼 표시
        <div className={styles.btnGroup}>
          <MintButton
            onClick={handleCreateInquiryClick} 
            text="작성하기"
            sizeW="w-24"
            sizeH="h-12"
            fontSize="text-lg"
          />
        </div>
      )}
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
          {inquiries.map((inquiry, index) => (
            <tr key={inquiry.inquiryNo} onClick={() => handleRowClick(inquiry.inquiryNo)} className={styles.row}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{inquiry.title}</td>
              <td className={styles.td}>{inquiry.userId}</td>
              <td className={styles.td}>{inquiry.inquiryDate.split("T")[0]}</td>
              <td className={styles.td}>{inquiry.readCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <InquirySearchForm onSubmit={handleSearchSubmit} />  
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
});

export default InquiryList;
