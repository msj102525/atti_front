import React, { useEffect, useState} from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import MemberCard from "@/components/admin/MemberCard"; // MemberCard 컴포넌트 가져오기
import styles from "@/styles/admin/memberList.module.css";
import { getMemberList, deleteMember } from "@/api/admin/memberList"; // 회원 관련 API 함수 가져오기
import { handleAxiosError } from "@/api/errorAxiosHandle"; // 오류 처리 함수 가져오기
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar"
import Pagination from "@/components/common/page";  // Pagination 컴포넌트 임포트

import SuspendModal from '@/components/admin/SuspendModal'; // SuspendModal 컴포넌트 가져오기





// QueryClient 생성
const queryClient = new QueryClient();


const MemberListComponent = observer(() => {
   
    const [searchInput, setSearchInput] = useState(""); // 검색 입력 상태
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [size, setSize] = useState(10); // 페이지 크기 상태
    const queryClient = useQueryClient(); // React Query 클라이언트
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [selectedUser, setSelectedUser] = useState(null); // 선택된 회원 정보
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false); // 정지 모달 열림 상태
    const [searchType, setSearchType] = useState('id'); // 'id' 또는 'name' 값을 가질 수 있는 상태
    const [searchParams, setSearchParams] = useState({ searchField: '', searchInput: '' });
    const searchField = searchType === 'id' ? 'userId' : 'userName';
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);


    const { data, isLoading, error, refetch } = useQuery(
        ['memberList', { searchField: searchParams.searchField, searchInput: searchParams.searchInput, page, size }],
        () => getMemberList({ searchField: searchParams.searchField, searchInput: searchParams.searchInput, page: page - 1, size }),
        {
            keepPreviousData: true,

            onSuccess: (data) => {
                setPageCount(data.totalPages);
              },


        }
    );


    useEffect(() => {
        refetch();
    }, [page, size, refetch]);



    // 회원 삭제 뮤테이션
    const deleteMemberMutation = useMutation(deleteMember, {
        onSuccess: () => {
            queryClient.invalidateQueries('memberList'); // 회원 리스트 쿼리 무효화
        },
        onError: handleAxiosError, // 오류 처리


    });


    // 검색 실행
    const executeSearch = () => {
        setPage(1); // 검색 시 페이지를 1로 초기화
        setSearchParams({ searchField, searchInput });
        refetch();
    };


    // Enter 키 눌렀을 때 검색 실행

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {

            executeSearch();

        }
    };


    // 검색 필드 변경 핸들러
    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    // 검색 입력 변경 핸들러
    const handleSearchChange = (event) => setSearchInput(event.target.value);

    // 회원 삭제 핸들러
    const handleDelete = (userId) => {
        console.log(`Delete member with ID: ${userId}`);
        deleteMemberMutation.mutate(userId);
    };

    //수정모달 작업중 ***************************

    const openEditModal = (userData) => {
        setSelectedUser(userData); // 선택된 회원 정보 설정
        setIsModalOpen(true); // 모달 열기
    };

    const closeEditModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    //******************************* 

    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected + 1);
        setCurrentPage(selectedPage.selected);
      };



    if (isLoading) return <div>Loading...</div>; // 로딩 중일 때 표시
    //밑에 한 줄 추가
    if (error) return <div>Error loading data: {error.message}</div>;
    //if (!data) return <div>No data</div>; // 데이터가 없을 때 표시



    return (
        
        <div className="max-w-screen-2xl mx-auto p-4">
            <Header />
            <div style={{ display: 'flex',justifyContent: "space-between", minHeight: '1050px' }}>
                <AdminSidebar />
                <div className={styles.content} flex justify-center mt-5>
                    <div className={styles.container}>
                        <h2>회원 리스트</h2>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                            <select value={searchType} onChange={handleSearchTypeChange}>
                                <option value="id">아이디</option>
                                <option value="name">회원이름</option>
                            </select>
                            <input type="text" placeholder="검색..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
                            <button onClick={executeSearch}>검색</button>
                        </div>
                        
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: "8vw", textAlign: "center" }}>회원아이디</th>
                                    <th style={{ width: "8vw",textAlign: "center" }}>회원이름</th>
                                    <th style={{ width: "8vw", textAlign: "center" }}>닉네임</th>
                                    <th style={{ width: "15vw", textAlign: "center" }}>이메일</th>
                                    <th style={{ width: "20vw", textAlign: "center" }}>관리</th> {/* 버튼을 넣을 공간 */}
                                </tr>
                            </thead>
                            <tbody>
                                {data && Array.isArray(data.members) ? (
                                    data.members.map(user => (
                                        <MemberCard
                                            key={user.userId}
                                            user={user}
                                            handleDelete={handleDelete}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>No data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                       
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <Pagination pageCount={pageCount} onPageChange={handlePageChange} currentPage={currentPage} />
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer />
            
        </div>
    );
});


// QueryClientProvider로 감싸기
const MemberListPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MemberListComponent />
        </QueryClientProvider>
    );
};

export default MemberListPage;