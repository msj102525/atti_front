import React, { useEffect, useState } from 'react';

const DetailPostModal = ({ isOpen, onClose, post, onEdit, onDelete, isAdmin }) => {
    const [owsjNum, setOwsjNum] = useState(null);
    const [owsjSubject, setOwsjSubject] = useState('');

    const handleEdit = async () => {
        try {
            onEdit({
                owsjNum: post.owsjNum,
                owsjSubject
            });
            onClose();
        } catch (error) {
            console.error("Error insert :", error);
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
            }}>
                <p>오늘 한 줄 주제 등록</p>
                <p>번호 : {post.owsjNum}</p>
                <label htmlFor="owsjSubject">주제:</label>
                <textarea
                    id="owsjSubject"
                    rows="5"
                    placeholder="주제를 입력하세요..."
                    value={owsjSubject}
                    onChange={(e) => setOwsjSubject(e.target.value)}
                />

                <div style={{ display: "flex" }}>
                    {
                        // isAdmin &&
                        <button onClick={handleEdit} className="btn btn-warning">수정하기</button>
                    }
                    <button onClick={handleDelete} className="btn btn-danger">삭제하기</button>
                    <button onClick={onClose} className="btn btn-primary">닫기</button>
                </div>
            </div>
        </div>
    );
};

export default DetailPostModal;
