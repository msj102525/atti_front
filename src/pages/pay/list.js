import React, { useState, useEffect } from "react";
import axios from "@/api/axiosApi";
import { useRouter } from "next/router";
import Pagination from "@/components/common/page";  // Pagination 컴포넌트 임포트
import styles from "@/styles/admin/noticeAdminVersion.module.css";
import Header from '../common/Header';
import SearchForm from "../pay/paySearch";
import Mintbutton from "@/components/common/MintButton"; 
import AdminSidebar from "@/components/admin/AdminSidebar"

const List = () => {
  const [pays, setPays] = useState([]);
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
  
        const response = await axios.get("/pay/search", {
          params: params,
        });
        
        const data = response.data.content;
        
        // 최종 데이터 설정
        setPays(data);
        setPageCount(response.data.totalPages);
      } catch (error) {
        console.error("There was an error fetching the pay list!", error);
      }
    };

    fetchData(currentPage);
  }, [currentPage, searchQuery]);


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

      setSearchQuery(formData);
      setCurrentPage(0);  // 검색 후 첫 페이지로 이동
      
      const response = await axios.get("/pay/search", {
          params: params
      });
      const data = response.data.content;
      
      // 최종 데이터 설정
      setPays(data);
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

      const response = await axios.get("/pay/search", {
        params: params,
      });
      const data = response.data.content;
      
      setPays(data);
      setCurrentPage(selected);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error("There was an error fetching the search results!", error);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <Header />
      
      <div style={{ display: 'flex', justifyContent: "space-between", minHeight: '1000px' }}>
        <AdminSidebar />
        <div className={styles.content}>
          <div className={styles.container}>
            <h2 className={styles.centeredText}>결제내역</h2>
            <SearchForm onSubmit={handleSearchSubmit} />
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>결제 아이디</th>
                  <th className={styles.th}>금액</th>
                  <th className={styles.th}>날짜</th>
                  <th className={styles.th}>결제 방법</th>
                  <th className={styles.th}>결제 대상</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {pays.map((pay) => (
                  <tr key={pay.payNum} className={styles.row}>
                    <td className={styles.td}>{pay.userId}</td>
                    <td className={styles.td}>{pay.payAmount}</td>
                    <td className={styles.td}>{pay.payDate}</td>
                    <td className={styles.td}>{pay.payMethod}</td>
                    <td className={styles.td}>{pay.toDoctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
