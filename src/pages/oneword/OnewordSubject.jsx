import Header from "../common/Header";
import styles from '@/styles/oneword/onewordsubject.module.css';
import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import OnewordSubjectListComponent from "../../components/oneword/OnewordSubjectListComponent";
import OnewordSubjectWriteModalComponent from "../../components/oneword/OnewordSubjectWriteModalComponent";
import Pagination from "@/components/common/page";  // Pagination 컴포넌트 임포트
import { handleAxiosError } from "../../api/errorAxiosHandle";
import { getOnewordSubjectList, getOnewordSubjectListCount, getOnewordSubjectDetail, insertOnewordSubject, updateOnewordSubject, deleteOnewordSubject } from "../../api/oneword/OnewordSubject";
import DetailPostModal from "../../components/oneword/DetailPostModal";
// import 'bootstrap/dist/css/bootstrap.min.css';

const OnewordSubjectComponent = observer(() => {
    const [keyword, setKeyword] = React.useState("");
    const [searchInput, setSearchInput] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(10);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const [isAdmin, setIsAdmin] = React.useState(false);

    const { data, isLoading } = useQuery(['onewordSubjectList', {keyword, page, size }], () => getOnewordSubjectList({
        keyword: keyword,
        page: page,
        size: size,
    }), {
        keepPreviousData: true,
    });

    const { data: getCount, isLoading: isLoading2 } = useQuery(['onewordSubjectListcount', { keyword }], () => getOnewordSubjectListCount({
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
    }, [])

    const handleSearchChange = (e) => setSearchInput(e.target.value);

    const executeSearch = () => setKeyword(searchInput);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    const handlePageChange = ({ selected }) => {
        // setCurrentPage(selected);
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

    const totalPages = Math.ceil(getCount / size); /// 전체 페이지 수

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="container mt-5">
                <h2>오늘 한 줄 주제</h2>
                <div style={{ height: "2vw", justifyContent: "center", textAlign: "left" }}>
                    {/* <select value={size} onChange={handleSizeChange} style={{ height: "88%" }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select> */}
                    <input type="text" placeholder="제목" value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
                    <button onClick={executeSearch}>검색</button>
                </div>
            </div>
            <div>
                <div className={styles['table-container']}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: "5vw", textAlign: "center" }}>번호</th>
                                <th style={{ textAlign: "center" }}>제목</th>
                                <th style={{ width: "10vw", textAlign: "center" }}>글쓴이</th>
                                <th style={{ width: "7vw", textAlign: "center" }}>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((onewordsubject, i) => (
                                <OnewordSubjectListComponent key={onewordsubject.owsjNum} onewordsubject={onewordsubject} isPinned onOnewordSubjectClick={() => openDetailModal(onewordsubject)} />
                            ))
                            }
                            {/* {data.pinnedNotices.map(notice => (
                            <OnewordSubjectListForm key={notice.id} notice={notice} isPinned onOnewordSubjectClick={() => openDetailModal(notice)} />
                        ))}
                        {data.regularNotices.map(notice => (
                            <OnewordSubjectListForm key={notice.id} notice={notice} onOnewordSubjectClick={() => openDetailModal(notice)} />
                        ))} */}
                        </tbody>
                    </table>
                </div>
                {/* {isAdmin && (
                    <div>
                        <button onClick={openModal}>글쓰기</button>
                    </div>
                )} */
                }

                <div>
                    <button onClick={openModal}>글쓰기</button>
                </div>

                <OnewordSubjectWriteModalComponent isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
                <DetailPostModal
                    isOpen={isDetailModalOpen}
                    onClose={closeDetailModal}
                    post={selectedOnewordSubject}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isAdmin={isAdmin}
                />

                {/* Pagination */}
                {/* <div>
                    <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
                    <span> Page {page} </span>
                    <button disabled={data.length < size} onClick={() => handlePageChange(page + 1)}>Next</button>
                </div> */}
                <div>
                    <Pagination pageCount={totalPages} onPageChange={handlePageChange} page={page} />
                </div>
            </div>
        </div>
    );
});

export default OnewordSubjectComponent;