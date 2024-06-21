import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getOnewordList, insertOneword } from "../../api/oneword/OnewordSubject";
import { handleAxiosError } from "../../api/errorAxiosHandle";

const OnewordSJDeatilComponent = observer((data) => {
    const router = useRouter();

    const [keyword, setKeyword] = React.useState("");
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

    const { data: owCommentData, isLoading } = useQuery(['onewordList', { keyword, page, size }], () => getOnewordList({
        keyword: keyword,
        page: page,
        size: size,
      }), {
        keepPreviousData: true,
      });

    // 등록
    const insertOnewordMutation = useMutation(insertOneword, {
        onSuccess: () => {
            // queryClient.invalidateQueries('onewordSubjectList').then();
        },
        onError: handleAxiosError,
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
        setOwComment([...owCommentData, newComment]);

        ////////////////////////////////////////////
        //// database에 저장 logic 추가
        ////////////////////////////////////////////
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

        // Clear edit mode
        setEditCommentId(null);
        setEditOwCommentContent('');
    };

    // Function to delete a comment
    const deleteComment = (commentId) => {
        const updatedComments = owComment.filter(comment => comment.id !== commentId);
        setOwComment(updatedComments);
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
                    <button onClick={addComment(data.data.owsjNum)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        저장
                    </button>
                </div>
            )}

            {/* Comments list */}
            <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">댓글</h3>
                {owCommentData && owCommentData.length === 0 ? (
                    <p>댓글이 없습니다.</p>
                ) : (
                    <ul>
                        {owCommentData && owCommentData.map(comment => (
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
                                        <p>{comment.content}</p>
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

            {/* Go back button */}
            <button onClick={goBack}>돌아가기</button>
        </div>
    );
});

export default OnewordSJDeatilComponent;