import React, { useEffect, useState } from 'react';

const DetailPostModal = ({ isOpen, onClose, post, onEdit, onDelete, isAdmin }) => {
    const [owsjNum, setOwsjNum] = useState(null);
    const [owsjSubject, setOwsjSubject] = useState('');

    const handleEdit = async () => {
        const confirmDelete = window.confirm("수정하시겠습니까?");
        if (confirmDelete) {

            try {
                onEdit({
                    owsjNum: post.owsjNum,
                    owsjSubject
                });
                onClose();
            } catch (error) {
                console.error("Error insert :", error);
            }
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                onDelete(post.owsjNum);
                onClose();
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }

    };

    useEffect(() => {
        if (isOpen && post && post.owsjNum && post.owsjSubject) {
            setOwsjSubject(post.owsjSubject);
        } else {
            setOwsjSubject(""); // post가 null이거나 owsjSubject가 없는 경우 빈 문자열로 설정
        }
    }, [isOpen, post]);

    if (!isOpen || !post) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center', // Center items horizontally
            }}>
                {/* <p style={{ marginBottom: '10px' }}>오늘 한 줄 주제 수정</p> */}
                <p style={{ marginBottom: '10px' }}>번호 : {post.owsjNum}</p>
                {/* <label htmlFor="owsjSubject" style={{ marginBottom: '10px' }}>오늘 한 줄 주제</label> */}
                <textarea
                    id="owsjSubject"
                    rows="10"
                    cols="30"
                    placeholder="주제를 입력하세요..."
                    value={owsjSubject}
                    onChange={(e) => setOwsjSubject(e.target.value)}
                    style={{ borderColor: 'gray', borderWidth: '2px', borderStyle: 'solid' }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                    <div style={{ display: "flex" }}>
                        {
                            isAdmin && (
                                <button
                                    onClick={handleEdit}
                                    style={{
                                        backgroundColor: '#f59e0b',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        border: 'none',
                                        outline: 'none',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#f97316'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#f59e0b'}
                                >
                                    수정하기
                                </button>
                            )
                        }
                        {isAdmin && (
                            <button
                                onClick={handleDelete}
                                style={{
                                    backgroundColor: '#f87171', // 배경색 빨간색
                                    color: 'white', // 텍스트 색상 흰색
                                    fontWeight: 'bold', // 굵은 글꼴
                                    padding: '0.5rem 1rem', // 내부 여백
                                    borderRadius: '0.25rem', // 모서리 둥글게
                                    cursor: 'pointer', // 마우스 커서 포인터 모양
                                    transition: 'background-color 0.3s ease', // 배경색 변화 부드럽게
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#ef4444'} // 호버시 배경색 더 진한 빨간색
                                onMouseOut={(e) => e.target.style.backgroundColor = '#f87171'} // 마우스 아웃시 다시 원래 배경색으로
                            >
                                삭제하기
                            </button>
                        )}
                        {/* <button onClick={onClose} className="btn btn-primary">닫기</button> */}
                        <button onClick={onClose} style={{
                            backgroundColor: '#4b5563',
                            color: '#fff',
                            fontWeight: 'bold',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease', // 배경색 변화 부드럽게
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#1f2937'} // 호버시 배경색 더 진한 빨간색
                            onMouseOut={(e) => e.target.style.backgroundColor = '#4b5563'} // 마우스 아웃시 다시 원래 배경색으로
                        >
                            닫기
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailPostModal;
