import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import MemberCard from "/components/admin/MemberCard"; // MemberCard 컴포넌트 가져오기
import styles from "@/styles/admin/memberList.module.css";
import { getMemberList, deleteMember } from "/pages/api/admin/memberList"; // 회원 관련 API 함수 가져오기
import { handleAxiosError } from "../../api/errorAxiosHandle"; // 오류 처리 함수 가져오기


// QueryClient 생성
const queryClient = new QueryClient();


const MemberListComponent = observer(() => {
    const [searchField, setSearchField] = useState(""); // 검색 필드 상태
    const [searchInput, setSearchInput] = useState(""); // 검색 입력 상태
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [size, setSize] = useState(10); // 페이지 크기 상태
    const queryClient = useQueryClient(); // React Query 클라이언트
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [selectedUser, setSelectedUser] = useState(null); // 선택된 회원 정보

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

    const { data, isLoading, error } = useQuery(
        'memberList',
        () => getMemberList({  }),
        {
            keepPreviousData: true, // 이전 데이터를 유지
        }
    );

   
   

    // 회원 삭제 뮤테이션
    const deleteMemberMutation = useMutation(deleteMember, {
        onSuccess: () => {
            queryClient.invalidateQueries('memberList'); // 회원 리스트 쿼리 무효화
        },
        onError: handleAxiosError, // 오류 처리
        
        
    });

    

    

    // 검색 입력 변경 핸들러
    const handleSearchChange = (e) => setSearchInput(e.target.value);

    // 검색 실행
    const executeSearch = () => setSearchField(searchInput);

    // Enter 키 눌렀을 때 검색 실행
     const handleKeyPress = (e) => {
         if (e.key === 'Enter') {
             executeSearch();
         }
     };

    // 페이지 크기 변경 핸들러
    const handleSizeChange = (e) => setSize(e.target.value);

    // 관리자 여부 설정
    useEffect(() => {
        //setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }, []);

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

    // 회원 정지 핸들러
    const handleSuspend = (userId) => {
        console.log(`Suspend member with ID: ${userId}`);
        // 정지 로직 처리
    };


    // const handleDelete = (memberId) => {
    //     console.log(`Delete member with ID: ${memberId}`);
    //     // deleteMemberMutation.mutate(memberId);
    // };

    if (isLoading) return <div>Loading...</div>; // 로딩 중일 때 표시
    //밑에 한 줄 추가
    if (error) return <div>Error loading data: {error.message}</div>;
    if (!data) return <div>No data</div>; // 데이터가 없을 때 표시

    return (
        <div className={styles.container}>
            <h2>회원 리스트</h2>
            <div style={{ height: "2vw", justifyContent: "center", textAlign: "right" }}>
                <select value={size} onChange={handleSizeChange} style={{ height: "88%" }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <input type="text" placeholder="아이디 검색..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
                <button onClick={executeSearch}>검색</button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ width: "5vw", textAlign: "center" }}>회원아이디</th>
                        <th style={{ textAlign: "center" }}>회원이름</th>
                        <th style={{ width: "10vw", textAlign: "center" }}>닉네임</th>
                        <th style={{ width: "7vw", textAlign: "center" }}>이메일</th>
                        <th style={{ width: "20vw", textAlign: "center" }}>관리</th> {/* 버튼을 넣을 공간 */}
                    
                    </tr>
                </thead>
                <tbody>
                {/* {data.members.map(member => (  */}
                    
                {/* {data && data.members && Array.isArray(data.members) && data.members.map(user => ( */}
                    {data.map(user => (
                    
                        <MemberCard
                        key={user.userId}
                        user={user}  
                        handleEdit={openEditModal}  //수정모달 열기 핸들러 전달 
                        handleSuspend={handleSuspend}
                        handleDelete={handleDelete}
                        />
                        //onDelete={handleDelete} 위에 구문에 원래 있던 것
                    ))}
                </tbody>
            </table>
            <div>
                {/* 페이지네이션 구현 (현재 페이지: {page}) */}
                {/* 페이지네이션 로직 추가 */}
            </div>
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