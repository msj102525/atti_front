import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import SuspensionMemberCard from "@/components/admin/SuspensionMemberCard"; // MemberCard 컴포넌트 가져오기
import styles from "@/styles/admin/suspensionMemberList.module.css";
import { getSuspensionMemberList, deleteSuspensionMember } from "@/api/admin/memberList"; // 회원 관련 API 함수 가져오기
import { handleAxiosError } from "@/api/errorAxiosHandle"; // 오류 처리 함수 가져오기
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar"

import SuspendModal from '@/components/admin/SuspendModal'; // SuspendModal 컴포넌트 가져오기


// QueryClient 생성
const queryClient = new QueryClient();


const SuspensionMemberListComponent = observer(() => {
    //const [searchField, setSearchField] = useState("id"); // 검색 필드 상태
    const [searchInput, setSearchInput] = useState(""); // 검색 입력 상태
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [size, setSize] = useState(10); // 페이지 크기 상태
    const queryClient = useQueryClient(); // React Query 클라이언트
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [selectedUser, setSelectedUser] = useState(null); // 선택된 회원 정보

    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false); // 정지 모달 열림 상태

    const [searchType, setSearchType] = useState('id'); // 'id' 또는 'name' 값을 가질 수 있는 상태

    const [searchParams, setSearchParams] = useState({ searchField: '', searchInput: '' });

    const searchField = searchType === 'id' ? 'userId' : 'suspensionTitle';




    // 임시 목 데이터
    // const adminData = {
    //     members: [
    //         { id: 1, userId: 'user1', userName: 'User One', nickName: 'nickname01', email: 'user1@example.com'  },
    //         { id: 2, userId: 'user2', userName: 'User Two', nickName: 'nickname02', email: 'user2@example.com' },
    //         // 필요한 만큼 추가
    //     ]
    // };

    // const regularUserData = {
    //     members: [
    //         { id: 1, userId: 'user11', userName: 'User One', nickName: 'user01', email: 'user1@example.com'  },
    //         { id: 2, userId: 'user22', userName: 'User Two', nickName: 'user02', email: 'user2@example.com' },
    //     ]
    // };

    // const data = isAdmin ? adminData : regularUserData;
    //  // isLoading을 true로 설정
    // const isLoading = false; // 실제 데이터를 불러오는 경우에는 이 값을 사용

    // 회원 리스트 가져오기
    //   const { data, isLoading, error } = useQuery(['/admin/memberList', { page, size, searchField }], () => getMemberList({
    //       searchField,
    //       page: page - 1,
    //       size
    //       //size: size,
    //   }), {
    //       keepPreviousData: true, // 이전 데이터를 유지
    //   });

    // const { data, isLoading, error, refetch } = useQuery(
    //     ['memberList', { searchField: searchType === 'id' ? 'userId' : 'userName', searchInput , page, size }],
    //     () => getMemberList({  searchField: searchType === 'id' ? 'userId' : 'userName', searchInput , page: page - 1, size }),
    //     {
    //         keepPreviousData: true, // 이전 데이터를 유지

    //     }
    // );

    const { data, isLoading, error, refetch } = useQuery(
        ['suspensionMemberList', { searchField: searchParams.searchField, searchInput: searchParams.searchInput, page, size }],
        () => getSuspensionMemberList({ searchField: searchParams.searchField, searchInput: searchParams.searchInput, page: page - 1, size }),
        {
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        refetch();
    }, [page, size, refetch]);



    // 회원 삭제 뮤테이션
    const deleteSuspensionMemberMutation = useMutation(deleteSuspensionMember, {
        onSuccess: () => {
            queryClient.invalidateQueries('suspensionMemberList'); // 회원 리스트 쿼리 무효화
        },
        onError: handleAxiosError, // 오류 처리


    });


    //검색관련

    // const executeSearch = () => {
    //     if (searchType === 'id') {
    //         // 아이디 검색 로직
    //         console.log('아이디로 검색:', searchInput);

    //     } else if (searchType === 'name') {
    //         // 회원 이름 검색 로직
    //         console.log('회원 이름으로 검색:', searchInput);

    //     }
    // };

    // const executeSearch = () => {
    //     setPage(1); // 검색 시 페이지를 1로 초기화
    //     queryClient.invalidateQueries(['memberList', { searchType, searchInput, page: 0, size }]);
    // };

    // 검색 실행
    // const executeSearch = () => {
    //     setPage(1); // 검색 시 페이지를 1로 초기화
    //     refetch();
    // };

    //     const executeSearch = () => {
    //         if (!searchField || !searchInput) {
    //             console.log('검색 필드와 검색어를 입력하세요.');
    //             return;
    //         }

    //         // 검색 필드가 아이디인 경우 'id', 이름인 경우 'name'으로 설정
    //         const searchFieldKey = searchType === 'id' ? 'userId' : 'userName';

    //         console.log('검색 필드:', searchFieldKey);
    //         console.log('검색어:', searchInput);
    //         console.log('페이지:', page);
    //         console.log('페이지 크기:', size);

    //         // 검색 필드와 검색어를 쿼리로 전달하여 데이터를 불러옴
    //          getMemberList({ searchField: searchFieldKey, searchInput, page: page - 1, size })
    //         .then(data => {
    //             console.log('검색 결과:', data);
    //             // 처리할 내용 추가
    //         })
    //         .catch(error => {
    //             console.error('검색 오류:', error);
    //             // 오류 처리 추가
    //         });
    // };
    // 검색 실행
    // 검색 실행



    // 검색 실행
    // const executeSearch = () => {
    //     if (!searchInput) {
    //         console.log('검색어를 입력하세요.');
    //         return;
    //     }

    //     // 검색 필드가 아이디인 경우 'userId', 이름인 경우 'userName'으로 설정
    //     const searchField = searchType === 'id' ? 'userId' : 'userName';

    //     console.log('검색 필드:', searchField);
    //     console.log('검색어:', searchInput);
    //     console.log('페이지:', page);
    //     console.log('페이지 크기:', size);

    //     // 검색 필드와 검색어를 쿼리로 전달하여 데이터를 불러옴
    //      getMemberList({ searchField, searchInput, page: page - 1, size })
    //          .then(data => {
    //              console.log('검색 결과:', data);
    //              // 처리할 내용 추가

    //         })
    //         .catch(error => {
    //             console.error('검색 오류:', error);
    //             // 오류 처리 추가

    //         });


    // };

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

    // 페이지 크기 변경 핸들러
    //const handleSizeChange = (event) => setSize(event.target.value);

    // 검색 필드 변경 핸들러
    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    // 검색 입력 변경 핸들러
    const handleSearchChange = (event) => setSearchInput(event.target.value);


    // 검색 필드 유형에 따른 검색 조건 설정
    // useEffect(() => {
    //     queryClient.invalidateQueries('memberList'); // 검색 필드가 변경될 때마다 쿼리 무효화
    // }, [searchType]);


    // useEffect(() => {
    //     // 입력값이 변경될 때마다 쿼리를 활성화
    //     if (searchInput) {
    //         queryClient.invalidateQueries('memberList'); // 검색 필드가 변경될 때마다 쿼리 무효화
    //     }
    // }, [searchInput]);

    // 검색 입력이 변경될 때마다 검색 실행
    // useEffect(() => {
    //     // 입력값이 변경될 때마다 검색 실행
    //     if (searchInput && searchInput.trim() !== '') {
    //         executeSearch();
    //     }
    // }, [searchInput]);

    // 검색 실행
    // const executeSearch = () => {
    //     const searchField = searchType === 'id' ? 'userId' : 'userName';
    //     setPage(1); // 검색 시 페이지를 1로 초기화
    //     queryClient.invalidateQueries('memberList');
    // };




    // 검색 실행
    //const executeSearch = () => setSearchField(searchInput);




    // 관리자 여부 설정
    //useEffect(() => {
    //setIsAdmin(localStorage.getItem("isAdmin") === "true");
    //}, []);



    // 회원 삭제 핸들러
    const handleDelete = (suspensionNo) => {
        console.log(`Delete member with ID: ${suspensionNo}`);
        deleteSuspensionMemberMutation.mutate(suspensionNo);
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


    // 회원 수정 핸들러
    // const handleEdit = async () => {  //(userId) => {
    //     if (!selectedUser) return;

    //     try {
    //         // 선택된 회원 정보 업데이트 요청
    //         await updateMember(selectedUser.userId, {
    //             name: selectedUser.userName,
    //             nickname: selectedUser.nickName,
    //             email: selectedUser.email
    //         });
    //         queryClient.invalidateQueries('memberList');
    //         closeEditModal(); // 모달 닫기
    //     } catch (error) {
    //         console.error("Error updating member:", error);
    //     }
    //     console.log(`Edit member with ID: ${userId}`);
    //     // 수정 로직 처리
    // };

    //정지 기능 구현 ***********************************
    // 회원 정지 핸들러
    // const handleSuspend = (user) => {
    //     //console.log(`Suspend member with ID: ${userId}`);
    //     setSelectedUser(user);
    //     setIsSuspendModalOpen(true);
    // };

    // const closeSuspendModal = () => {
    //     setIsSuspendModalOpen(false);
    //     setSelectedUser(null);
    // };


    // const handleDelete = (memberId) => {
    //     console.log(`Delete member with ID: ${memberId}`);
    //     // deleteMemberMutation.mutate(memberId);
    // };

    if (isLoading) return <div>Loading...</div>; // 로딩 중일 때 표시
    //밑에 한 줄 추가
    if (error) return <div>Error loading data: {error.message}</div>;
    //if (!data) return <div>No data</div>; // 데이터가 없을 때 표시


    return (
        <div>
            <Header />

            <div style={{ display: 'flex' }}>
                <AdminSidebar />
                <div className={styles.content}>
                    <div className={styles.container}>
                        <h2 className={styles.centeredText}>정지 회원</h2>
                        {/* <div style={{ height: "2vw", justifyContent: "center", textAlign: "right" }}> */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                            {/* <select value={size} onChange={handleSizeChange} style={{ height: "88%" }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select> */}
                            <select value={searchType} onChange={handleSearchTypeChange}>
                                <option value="id">아이디</option>
                                <option value="name">정지사유</option>
                            </select>
                            {/* <input type="text" placeholder="검색..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} /> */}
                            <input type="text" placeholder="검색..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
                            <button onClick={executeSearch}>검색</button>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: "5vw", textAlign: "center" }}>회원아이디</th>
                                    <th style={{ textAlign: "center" }}>정지사유</th>
                                    <th style={{ width: "10vw", textAlign: "center" }}>정지상세내용</th>
                                    <th style={{ width: "20vw", textAlign: "center" }}>관리</th> {/* 버튼을 넣을 공간 */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* {data.members.map(member => (  */}

                                {/* {data && data.members && Array.isArray(data.members) && data.members.map(user => ( */}
                                {/* {data.map(user => (
                    
                        <SuspensionMemberCard
                        key={user.suspensionNo}
                        user={user}  
                        //handleEdit={openEditModal}  //수정모달 열기 핸들러 전달 
                        //handleSuspend={handleSuspend}
                        handleDelete={handleDelete}
                        />
                        //onDelete={handleDelete} 위에 구문에 원래 있던 것
                    ))} */}


                                {data && Array.isArray(data) ? (
                                    data.map(user => (
                                        <SuspensionMemberCard
                                            key={user.suspensionNo}
                                            user={user}
                                            //handleEdit={openEditModal}  //수정모달 열기 핸들러 전달 
                                            //handleSuspend={handleSuspend}
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
                            {/* 페이지네이션 구현 (현재 페이지: {page}) */}
                            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>이전</button>
                            <button onClick={() => setPage(prev => prev + 1)} disabled={data.length < size}>다음</button>
                            {/* 페이지네이션 로직 추가 */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
});


// QueryClientProvider로 감싸기
const SuspensionMemberListPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <SuspensionMemberListComponent />
        </QueryClientProvider>
    );
};

export default SuspensionMemberListPage;
