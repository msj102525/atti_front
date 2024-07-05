import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getOnewordList, insertOneword, updateOneword, deleteOneword } from "@/api/oneword/Oneword";
import { handleAxiosError } from "@/api/errorAxiosHandle";

const OnewordSJDeatilComponent = observer((data) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    // const [keyword, setKeyword] = React.useState("");
    // Initialize keyword state with data.data.owsjNum
    const [keyword, setKeyword] = React.useState(data.data.owsjNum.toString());

    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(10);

    const [userId, setUserId] = React.useState("");

    // State for owComment
    const [owComment, setOwComment] = useState([]);

    // State for editing mode
    const [editCommentId, setEditCommentId] = useState(null);
    const [editOwCommentContent, setEditOwCommentContent] = useState('');

    // State for adding new comment mode
    const [addingOwComment, setAddingOwComment] = useState(false);
    const [newOwCommentContent, setNewOwCommentContent] = useState('');

    const { data: owCommentData, isLoading, refetch } = useQuery(['onewordList', { keyword, page, size }], () => getOnewordList({
        keyword: keyword,
        page: page,
        size: size,
    }), {
        keepPreviousData: true,
    });

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
    }, [])

    // Function to toggle add comment mode
    const toggleAddCommentMode = () => {

        setAddingOwComment(!addingOwComment);

        if (!addingOwComment) {
            // Clear edit mode
            setEditCommentId(null);
            setEditOwCommentContent('');
        } else {
            // Reset new comment content
            setNewOwCommentContent('');
        }
    };

    // Function to add a new comment
    const addComment = (owsjNum) => {
        const newComment = {
            owsjNum: owsjNum,
            owContent: newOwCommentContent.trim() !== '' ? newOwCommentContent : `새 오늘 한 줄 ${new Date().toLocaleString()}`
        };

        // Update state with new comment
        setOwComment([...(owCommentData || []), newComment]);

        // console.log("newComment : " + newComment);

        ////////////////////////////////////////////
        //// database에 저장 logic 추가
        ////////////////////////////////////////////
        // Call mutation to insert new comment
        insertOnewordMutation.mutate(newComment);

        // Exit add comment mode
        setAddingOwComment(false);
        setNewOwCommentContent('');
    };

    // Function to edit a comment
    const editComment = (commentId) => {
        const editedComments = owComment.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    content: editOwCommentContent
                };
            }
            return comment;
        });

        // Update state with edited owComment
        setOwComment(editedComments);

        // add
        const newComment = {
            owNum: editCommentId,
            owsjNum: keyword,
            owContent: editOwCommentContent
        };

        // Update state with new comment
        // setOwComment([...(owCommentData || []), newComment]);

        //database update(2024.06.24)
        updateOnewordMutation.mutate(newComment);

        // Clear edit mode
        setEditCommentId(null);
        setEditOwCommentContent('');
    };

    // insert
    const insertOnewordMutation = useMutation(insertOneword, {
        onSuccess: () => {
            queryClient.invalidateQueries('onewordList').then();
        },
        onError: handleAxiosError,
    });

    // update
    const updateOnewordMutation = useMutation(updateOneword, {
        onSuccess: () => {
            queryClient.invalidateQueries('onewordList').then();
        },
        onError: handleAxiosError,
    });

    // delete
    const deleteOnewordMutation = useMutation(deleteOneword, {
        onSuccess: () => {
            queryClient.invalidateQueries('onewordList').then();
        },
        onError: handleAxiosError,
    });

    //// 삭제
    // Function to delete a comment
    const deleteComment = (owNum) => {
        // Confirm deletion
        if (window.confirm("정말로 삭제히시겠습니까?")) {
            // User clicked OK, proceed with deletion
            const updatedComments = owComment.filter(comment => comment.owNum !== owNum);
            setOwComment(updatedComments);

            //// 삭제 처리
            deleteOnewordMutation.mutate(owNum);
        } else {
            // User clicked Cancel, do nothing
            return;
        }
    };

    // Function to toggle edit mode
    const toggleEditMode = (commentId, currentContent) => {
        setEditCommentId(commentId);
        setEditOwCommentContent(currentContent);
    };

    // Function to handle input change in edit mode
    const handleEditInputChange = (e) => {
        setEditOwCommentContent(e.target.value);
    };

    // Function to handle input change for new comment
    const handleNewCommentInputChange = (e) => {
        setNewOwCommentContent(e.target.value);
    };

    // Function to navigate back
    const goBack = () => {
        router.back(); // Navigate back to previous page
    };

    useEffect(() => {
        // Update keyword when data.data.owsjNum changes
        setKeyword(data.data.owsjNum.toString());
    }, [data.data.owsjNum]);

    // sytle
    const roundedStyle = {
        borderRadius: '10% 10% 10% 10% / 90% 90% 90% 90%', // (수직 / 수평) 각 모서리의 둥근 정도를 설정합니다.
    };

    return (
        <div className="max-w-screen-lg p-4 mx-auto">
            {/* Navigation */}
            <div className="after:content-[''] after:bg-gray-300 after:block after:w-full after:h-[2px] after:left-0 after-bottom-0">
                <div className="flex p-4 gap-x-2">
                    <p>홈화면&gt;</p>
                    <p>오늘 한 줄&gt;</p>
                </div>
            </div>

            <div>
                {/* Display content */}
                <div className="border p-4 mt-4 flex flex-col w-500 h-50 overflow-hidden" style={{ backgroundColor: '#F2EFE2', ...roundedStyle }}>
                    <div className="flex">
                        <p className="mt-2 ml-5 text-sm text-gray-600">{data.data.owsjWriter}</p>
                    </div>
                    <div>
                        <h2 className="mt-2 ml-5 text-lg font-bold">
                            {data.data.owsjSubject.split('\n').map((paragraph, index) => (
                                <React.Fragment key={index}>
                                    {paragraph}
                                    <br /> {/* 각 단락 사이에 줄바꿈을 추가 */}
                                </React.Fragment>
                            ))}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex">
                <div>
                    {/* Go back button */}
                    <button onClick={goBack} className="mt-4 bg-black hover:bg-gray-900 text-white py-2 px-4 rounded">이전화면</button>
                </div>

                {/* Add comment button */}
                {userId && (
                    <button onClick={toggleAddCommentMode} style={{ marginLeft: '10px' }} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        {addingOwComment ? '취소' : '추가'}
                    </button>
                )}
            </div>

            <div className="mt-4">
                <hr className="mb-2" />
                <h1 className="text-lg font-bold mb-2">오늘 한 줄</h1>
                <hr className="mb-2" />
            </div>

            {/* New comment input */}
            {addingOwComment && (
                <div className="mt-4">
                    <textarea
                        value={newOwCommentContent}
                        onChange={handleNewCommentInputChange}
                        placeholder="오늘 한 줄을 입력하세요..."
                        className="border p-2 mb-2 w-full"
                    />
                    <button onClick={() => addComment(data.data.owsjNum)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        저장
                    </button>
                </div>
            )}


            {/* Comments list */}
            {owCommentData && (
                <div className="mt-4">
                    {owCommentData.length === 0 ? (
                        <p>오늘 할 줄을 입력해 보세요.</p>
                    ) : (
                        <ul>
                            {owCommentData.map(comment => {
                                // userId와 comment.owWriter가 동일한지 비교하여 editMode와 deleteMode 설정
                                const editMode = userId === comment.owWriter;
                                const deleteMode = userId === comment.owWriter;

                                return (
                                    <li key={comment.owNum} className="border p-2 mb-2">
                                        {editCommentId === comment.owNum ? (
                                            <>
                                                <textarea
                                                    value={editOwCommentContent}
                                                    onChange={handleEditInputChange}
                                                    className="border p-2 mb-2 resize-none h-20 w-full"
                                                    rows="5"
                                                />
                                                {editMode && (
                                                    <button onClick={() => editComment(comment.id)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                                                        저장
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p>{comment.owContent.split('\n').map((line, index) => (
                                                    <React.Fragment key={index}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}</p>

                                                {userId && (editMode || deleteMode) && (
                                                    <div className="mt-2">
                                                        {editMode && (
                                                            <button onClick={() => toggleEditMode(comment.owNum, comment.owContent)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2">
                                                                수정
                                                            </button>
                                                        )}
                                                        {deleteMode && (
                                                            <button onClick={() => deleteComment(comment.owNum)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                                                                삭제
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );


});

export default OnewordSJDeatilComponent;