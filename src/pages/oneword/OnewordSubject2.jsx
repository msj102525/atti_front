import React, { useState, useEffect } from 'react';
import Header from "../common/Header";
import OnewordSubjectListComponent2 from "../../components/oneword/OnewordSubjectListComponent2";
import OnewordSubjectWriteModalComponent from "../../components/oneword/OnewordSubjectWriteModalComponent";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getOnewordSubjectList, getOnewordSubjectDetail, insertOnewordSubject, updateOnewordSubject, deleteOnewordSubject } from "../../api/oneword/OnewordSubject";
import { handleAxiosError } from "../../api/errorAxiosHandle";

const OnewordSubjectComponent2 = () => {
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [selectedOnewordSubject, setSelectedOnewordSubject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editMode, setEditMode] = useState(false); // State to manage edit mode
    const [editedTitle, setEditedTitle] = useState(""); // State to store edited title
    const queryClient = useQueryClient();

    const { data: onewordSubjects, isLoading } = useQuery(['onewordSubjectList', { page, size }], () => getOnewordSubjectList({ page: page - 1, size }), {
        keepPreviousData: true,
    });

    useEffect(() => {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }, []);

    const handleSearchChange = (e) => setSearchInput(e.target.value);

    const executeSearch = () => {
        // Implement search functionality
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber < 1 ? 1 : pageNumber);
    };

    const handleSizeChange = (e) => setSize(e.target.value);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (onewordSubjectData) => {
        try {
            await insertOnewordSubjectMutation.mutateAsync(onewordSubjectData);
            queryClient.invalidateQueries('onewordSubjectList');
            closeModal(); // 성공 시 모달 닫기
        } catch (error) {
            console.error("Error inserting oneword subject:", error);
            // 여기서 오류 처리 로직 추가: 예를 들어, 사용자에게 오류 메시지 표시 등
        }
    };

    const handleEdit = async (updatedSubject) => {
        try {
            await updateOnewordSubjectMutation.mutateAsync(updatedSubject);
            queryClient.invalidateQueries('onewordSubjectList');
        } catch (error) {
            console.error("Error updating oneword subject:", error);
            // Handle error: Display error message to the user
        }
    };

    const handleDelete = (owsjNum) => {
        deleteOnewordSubjectMutation.mutate(owsjNum);
    };

    const readSubjectDetailMutation = useMutation(getOnewordSubjectDetail, {
        onSuccess: (data) => {
            console.log('fetch data ... ', data);
            setSelectedOnewordSubject(data);
        },
        onError: handleAxiosError,
    });

    const openDetailModal = async (onewordSubject) => {
        try {
            await readSubjectDetailMutation.mutateAsync(onewordSubject.owsjNum);
        } catch (error) {
            console.error("Error fetching oneword subject detail:", error);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (!editMode && selectedOnewordSubject) {
            setEditedTitle(selectedOnewordSubject.owsjSubject);
        }
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleTitleSave = async () => {
        try {
            const updatedSubject = {
                ...selectedOnewordSubject,
                owsjSubject: editedTitle
            };
            await handleEdit(updatedSubject);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating oneword subject:", error);
        }
    };

    // const handleTitleSave = async () => {
    //     try {
    //         // 현재 선택된 주제의 이전 제목
    //         const previousSubjectTitle = selectedOnewordSubject.owsjSubject;
    
    //         const updatedSubject = {
    //             ...selectedOnewordSubject,
    //             owsjSubject: editedTitle
    //         };
    
    //         await handleEdit(updatedSubject);
    //         setEditMode(false);
    
    //         // 여기서 previousSubjectTitle을 사용할 수 있음
    //         console.log('이전 제목:', previousSubjectTitle);
    //     } catch (error) {
    //         console.error("Error updating oneword subject:", error);
    //     }
    // };

    if (isLoading) return <div>Loading...</div>;
    if (!onewordSubjects) return <div>No data</div>;

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h2>오늘 한 줄 주제</h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                    {/* 좌측 리스트 */}
                    <div style={{ flex: 1 }}>
                        <input type="text" placeholder="Search by title..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
                        <button onClick={executeSearch}>검색</button>
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
                                {onewordSubjects.map((onewordsubject) => (
                                    <OnewordSubjectListComponent2 key={onewordsubject.owsjNum} 
                                                onewordsubject={onewordsubject} 
                                                onNoticeClick={() => openDetailModal(onewordsubject)} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* 우측 상세 정보 영역 */}
                    <div style={{ flex: 2 }}>
                        <div>
                            <h3>상세 정보</h3>
                            {selectedOnewordSubject ? (
                                <>
									<p>번호: {selectedOnewordSubject.owsjNum}</p>
                                    <div> <label htmlFor="editedTitle">제목:</label> 
                                        <input type="text" id="editedTitle" value={editedTitle} onChange={handleTitleChange} /> 
                                    </div>
									<p>글쓴이: {selectedOnewordSubject.owsjWriter}</p>
									<p>작성일: {selectedOnewordSubject.owsjWriteDate}</p>
									<div>
										<button onClick={toggleEditMode} className="btn btn-warning">수정하기</button>
										<button onClick={() => handleDelete(selectedOnewordSubject.owsjNum)} className="btn btn-danger">삭제하기</button>
									</div>
                                </>
                            ) : (
                                <p>No selected subject</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <OnewordSubjectWriteModalComponent isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
            {/* Pagination */}
            <div>
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
                <span> Page {page} </span>
                <button disabled={onewordSubjects.length < size} onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default OnewordSubjectComponent2;
