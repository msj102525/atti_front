import Header from "../common/Header";
import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import OnewordSubjectListComponent from "../../components/oneword/OnewordSubjectListComponent";
import OnewordSubjectWriteModalComponent from "../../components/oneword/OnewordSubjectWriteModalComponent";
import Pagination from "@/components/common/page";  // Pagination 컴포넌트 임포트
import { handleAxiosError } from "../../api/errorAxiosHandle";
import { getOnewordSubjectList, getOnewordSubjectListCount, getOnewordSubjectDetail, insertOnewordSubject, updateOnewordSubject, deleteOnewordSubject } from "../../api/oneword/OnewordSubject";
import DetailPostModal from "../../components/oneword/DetailPostModal";

const OnewordSubjectComponent = observer(() => {
    const [keyword, setKeyword] = React.useState("");
    const [searchInput, setSearchInput] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(10);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const [isAdmin, setIsAdmin] = React.useState(false);

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

    const totalPages = Math.ceil(getCount / size); /// 전체 페이지 수

    return (
        <div>
            <div>
                <Header />
            </div>
            {/* <div className="container mt-5"> */}
            <div className="container mx-auto mt-5">
                <h2>오늘 한 줄 주제</h2>
                <div style={{ height: "2vw", justifyContent: "center", textAlign: "left" }}>
                    {/* <select value={size} onChange={handleSizeChange} style={{ height: "88%" }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select> */}
                    <input type="text" placeholder="제목" className="border border-black rounded py-2 px-4"
                        value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
                    <button onClick={executeSearch}>검색</button>
                </div>
            </div>
            <div className="container mx-auto mt-5">
                {/* <div className={styles['table-container']}> */}
                <div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" style={{ width: "5vw", textAlign: "center" }}>번호</th>
                                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" style={{ textAlign: "center" }}>제목</th>
                                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" style={{ width: "10vw", textAlign: "center" }}>글쓴이</th>
                                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" style={{ width: "7vw", textAlign: "center" }}>작성일</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* 데이터가 있을 경우 최대 10개의 행을 표시 */}
                            {data.slice(0, 10).map((onewordsubject, index) => (
                                <OnewordSubjectListComponent
                                    key={onewordsubject.owsjNum}
                                    onewordsubject={onewordsubject}
                                    isPinned
                                    onOnewordSubjectClick={() => openDetailModal(onewordsubject)}
                                />
                            ))}

                            {/* 데이터가 10개 미만인 경우 빈 공간을 추가하여 10개의 행을 유지 */}
                            {Array.from({ length: Math.max(10 - data.length, 0) }).map((_, index) => (
                                <tr key={`empty-${index}`} className="h-16">
                                    <td className="px-6 py-4 whitespace-no-wrap" colSpan="4">
                                        {/* 빈 공간 */}
                                    </td>
                                </tr>
                            ))}
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
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">글쓰기</button>
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