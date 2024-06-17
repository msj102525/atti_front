import Header from "../common/Header";
import styles from '@/styles/oneword/onewordsubject.module.css';
import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import OnewordSubjectListComponent from "../../components/oneword/OnewordSubjectListComponent";
import OnewordSubjectWriteModalComponent from "../../components/oneword/OnewordSubjectWriteModalComponent";
import { handleAxiosError } from "../../api/errorAxiosHandle";
import { getOnewordSubjectList, getOnewordSubjectDetail, insertOnewordSubject, updateOnewordSubject, deleteOnewordSubject } from "../../api/oneword/OnewordSubject";
import DetailPostModal from "../../components/oneword/DetailPostModal";

const OnewordSubjectComponent = observer(() => {
    const [searchTitle, setSearchTitle] = React.useState("");
    const [searchInput, setSearchInput] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(10);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const [isAdmin, setIsAdmin] = React.useState(false);

    const { data, isLoading } = useQuery(['onewordSubjectList', { page, size }], () => getOnewordSubjectList({
        page: page - 1,
        size: size,
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

    const executeSearch = () => setSearchTitle(searchInput);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    const handlePageChange = (pageNumber) => {
        // 페이지가 음수가 되지 않도록 처리
        if (pageNumber < 1) {
            setPage(1);
        } else {
            setPage(pageNumber);
        }
    };

    const handleSizeChange = (e) => setSize(e.target.value);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 등록
    const handleSubmit = (onewordSubjectData) => insertOnewordSubjectMutation.mutate(onewordSubjectData);

    // 수정
    const handleEdit = (onewordSubjectData) => {
        console.log('Edit onewordSubjectData:', onewordSubjectData.owsjNum);
        updateOnewordSubjectMutation.mutate({
            owsjNum: onewordSubjectData.owsjNum,
            owsjSubject: onewordSubjectData.owsjSubject
        });
    };

    // 삭제
    const handleDelete = (owsjNum) => {
        deleteOnewordSubjectMutation.mutate(owsjNum);
    };

    const [selectedOnewordSubject, setSelectedOnewordSubject] = React.useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);

    // 상세 조회
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

    // const totalRows = data ? data.length : 0; // 전체 행의 개수
    // const totalPages = Math.ceil(totalRows / size); // 전체 페이지 수
    // console.log("전체 갯수 : " + totalRows);
    // console.log("전체 페이지수 : " + totalPages);

    // // 빈 항목으로 채울 개수 계산
    // // const emptyItemCount = size * totalPages - totalRows;
    // const emptyItemCount = size - totalRows;
    // console.log("공백 갯수 : " + emptyItemCount);

    // // 데이터가 없는 경우 빈 항목을 포함하여 데이터 생성
    // const filledData = data ? data.concat(Array.from({ length: emptyItemCount }, (_, index) => ({ id: data.length + index, name: 'Placeholder' }))) : Array.from({ length: size }, (_, index) => ({ id: index, name: 'Placeholder' }));
    // console.log("최종 갯수 : " + filledData.length);

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="container mt-5">
                <h2>오늘 한 줄 주제</h2>
                <div style={{ height: "2vw", justifyContent: "center", textAlign: "right" }}>
                    <select value={size} onChange={handleSizeChange} style={{ height: "88%" }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <input type="text" placeholder="Search by title..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
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
                                <OnewordSubjectListComponent key={onewordsubject.owsjNum} onewordsubject={onewordsubject} isPinned onNoticeClick={() => openDetailModal(onewordsubject)} />
                            ))
                            }
                            {/* {data.pinnedNotices.map(notice => (
                            <OnewordSubjectListForm key={notice.id} notice={notice} isPinned onNoticeClick={() => openDetailModal(notice)} />
                        ))}
                        {data.regularNotices.map(notice => (
                            <OnewordSubjectListForm key={notice.id} notice={notice} onNoticeClick={() => openDetailModal(notice)} />
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
                    // onLike={handleLike}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isAdmin={isAdmin}
                />

                {/* Pagination */}
                <div>
                    <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
                    <span> Page {page} </span>
                    <button disabled={data.length < size} onClick={() => handlePageChange(page + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
});

export default OnewordSubjectComponent;