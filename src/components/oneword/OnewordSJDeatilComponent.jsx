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
            owContent: newOwCommentContent.trim() !== '' ? newOwCommentContent : `새 댓글 ${new Date().toLocaleString()}`
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

    return (
        <div className="border max-w-screen-lg p-4 mx-auto">
            {/* Navigation */}
            <div className="after:content-[''] after:bg-gray-300 after:block after:w-full after:h-[2px] after:left-0 after-bottom-0">
                <div className="flex p-4 gap-x-2">
                    <p>홈화면&gt;</p>
                    <p>오늘 한 줄&gt;</p>
                </div>
            </div>

            {/* Display content */}
            <div className="border p-4 rounded">
                <div className="cursor-pointer">
                    <h2 className="text-lg font-bold">{data.data.owsjNum}</h2>
                    <h2 className="text-lg font-bold">{data.data.owsjSubject}</h2>
                    <p className="mt-2 text-sm text-gray-600">{data.data.owsjWriter}</p>
                </div>
            </div>

            {/* Add comment button */}
            <button onClick={toggleAddCommentMode} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                {addingOwComment ? '취소' : '추가'}
            </button>

            {/* New comment input */}
            {addingOwComment && (
                <div className="mt-4">
                    <textarea
                        value={newOwCommentContent}
                        onChange={handleNewCommentInputChange}
                        placeholder="새 댓글을 입력하세요..."
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
                    <h3 className="text-lg font-bold mb-2">댓글</h3>
                    {owCommentData.length === 0 ? (
                        <p>댓글이 없습니다.</p>
                    ) : (
                        <ul>
                            {owCommentData.map(comment => (
                                <li key={comment.owNum} className="border p-2 mb-2">
                                    {editCommentId === comment.owNum ? (
                                        <>
                                            <textarea value={editOwCommentContent} onChange={handleEditInputChange} className="border p-2 mb-2" />
                                            <button onClick={() => editComment(comment.id)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                                                저장
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <p>{comment.owContent}</p>
                                            <p>{comment.owNum}</p>
                                            <div>
                                                <button onClick={() => toggleEditMode(comment.owNum, comment.owContent)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2">
                                                    수정
                                                </button>
                                                <button onClick={() => deleteComment(comment.owNum)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                                                    삭제
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}


            {/* Go back button */}
            <button onClick={goBack}>돌아가기</button>
        </div>
    );


});

export default OnewordSJDeatilComponent;