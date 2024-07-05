import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { handleAxiosError } from "@/api/errorAxiosHandle";
import { getOnewordSubjectList, getOnewordSubjectListCount, getOnewordSubjectDetail, insertOnewordSubject, updateOnewordSubject, deleteOnewordSubject } from "@/api/oneword/OnewordSubject";
import OnewordSubjectListComponent from "@/components/oneword/OnewordSubjectListComponent";
import OnewordSubjectWriteModalComponent from "@/components/oneword/OnewordSubjectWriteModalComponent";
import OnewordSubjectModify from "@/components/oneword/OnewordSubjectModifyModalComponent";
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar"
import styles from "@/styles/oneword/onewordsubjectAdmin.module.css";
import Pagination from "@/components/common/page";  // Pagination 컴포넌트 임포트

const OnewordSubjectComponent = observer(() => {
    const [keyword, setKeyword] = React.useState("");
    const [searchInput, setSearchInput] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(10);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [userId, setUserId] = React.useState("");

    const { data, isLoading } = useQuery(['onewordSubjectList', { keyword, page, size }], () => getOnewordSubjectList({
        keyword: keyword,
        page: page,
        size: size,
    }), {
        keepPreviousData: true,
    });

    const { data: getCount, isLoading: isLoading2 } = useQuery(['onewordSubjectListcount', { keyword }],
        () => getOnewordSubjectListCount({
            keyword: keyword,
        }), {
        keepPreviousData: true,
    });

    // 등록
    const insertOnewordSubjectMutation = useMutation(insertOnewordSubject, {
        onSuccess: () => {
            queryClient.invalidateQueries('onewordSubjectList').then();
        },
        onError: handleAxiosError,
    });

    // 수정
    const updateOnewordSubjectMutation = useMutation(updateOnewordSubject, {
        onSuccess: () => {
            queryClient.invalidateQueries('onewordSubjectList').then();
        },
        onError: handleAxiosError,
    });

    // 삭제
    const deleteOnewordSubjectMutation = useMutation(deleteOnewordSubject, {
        onSuccess: () => {
            queryClient.invalidateQueries('onewordSubjectList').then();
        },
        onError: handleAxiosError,
    });

    useEffect(() => {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
        setUserId(localStorage.getItem("userId"));
    }, [])

    const handleSearchChange = (e) => setSearchInput(e.target.value);

    const executeSearch = () => setKeyword(searchInput);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    const handlePageChange = ({ selected }) => {
        setPage(selected + 1);
    };

    // const handleSizeChange = (e) => setSize(e.target.value);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //// 등록
    const handleSubmit = (onewordSubjectData) => insertOnewordSubjectMutation.mutate(onewordSubjectData);

    //// 수정
    const handleEdit = (onewordSubjectData) => {
        console.log('Edit onewordSubjectData:', onewordSubjectData.owsjNum);
        updateOnewordSubjectMutation.mutate({
            owsjNum: onewordSubjectData.owsjNum,
            owsjSubject: onewordSubjectData.owsjSubject
        });
    };

    //// 삭제
    const handleDelete = (owsjNum) => {
        deleteOnewordSubjectMutation.mutate(owsjNum);
    };


    const [selectedOnewordSubject, setSelectedOnewordSubject] = React.useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);

    //// 상세 조회
    const readSubjectDetailMutation = useMutation(getOnewordSubjectDetail, {
        onSuccess: () => {
            queryClient.invalidateQueries('onewordSubjectList').then();
        },
        onError: handleAxiosError,
    });

    const openDetailModal = (onewordSubject) => {
        readSubjectDetailMutation.mutate(onewordSubject.owsjNum);
        setSelectedOnewordSubject(onewordSubject);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedOnewordSubject(null);
        setIsDetailModalOpen(false);
    };

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    // console.log("admin 유무 : " + isAdmin);
    // console.log("userId : " + userId);

    const totalPages = Math.ceil(getCount / size); /// 전체 페이지 수

    return (
        <div className="max-w-screen-2xl mx-auto p-4">
            <Header />

            <div style={{ display: 'flex', justifyContent: "space-between", minHeight: '1050px' }}>
                {isAdmin && (
                    <AdminSidebar />)
                }

                <div className={styles.content} flex justify-center mt-5 >
                    <div className={styles.container}>
                        <h2 className={styles.centeredText}>오늘 한 줄 주제 등록(Admin ver.)</h2>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left" }}>
                            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}> */}
                            {/* 오른쪽에 제목 입력 필드와 검색 버튼을 포함하는 영역 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="text"
                                    placeholder="제목"
                                    className="border border-black rounded py-2 px-4 mr-2" // 여기서 mr-2 클래스를 추가하여 오른쪽으로 2칸 띄웁니다.
                                    value={searchInput}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyPress}
                                />
                                <button onClick={executeSearch}>검색</button>
                            </div>

                            {/* 좌측에 등록 버튼 */}
                            {isAdmin && (
                                <div>
                                    <button className={styles.mkbutton} style={{ marginRight: "10px" }} onClick={openModal}>&nbsp;등&nbsp;록&nbsp;</button>
                                </div>)
                            }
                        </div>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: "5vw", textAlign: "center" }}>번호</th>
                                    <th style={{ width: "30vw", textAlign: "center" }}>제목</th>
                                    <th style={{ width: "5vw", textAlign: "center" }}>작성자</th>
                                    <th style={{ width: "5vw", textAlign: "center" }}>작성일</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* 데이터가 있을 경우 최대 10개의 행을 표시 */}
                                {data.slice(0, 10).map((onewordsubject, index) => (
                                    <OnewordSubjectListComponent
                                        key={onewordsubject.owsjNum}
                                        onewordsubject={onewordsubject}
                                        onOnewordSubjectClick={() => openDetailModal(onewordsubject)}
                                    />
                                ))}
                            </tbody>
                        </table>
                        {/* 글쓰기 */}
                        <OnewordSubjectWriteModalComponent isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
                        {/* 글 수정, 삭제(userId가 존재하지 않을 경우 비활성화 처리) */}
                        {userId && (
                            <OnewordSubjectModify isOpen={isDetailModalOpen} onClose={closeDetailModal}
                                post={selectedOnewordSubject}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isAdmin={isAdmin}
                            />)}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <Pagination pageCount={totalPages} onPageChange={handlePageChange} page={page} />
                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );

});

export default OnewordSubjectComponent;