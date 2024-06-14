import React, {useEffect, useState} from 'react';

const DetailPostModal = ({ isOpen, onClose, post, onEdit, isAdmin }) => {
    const [owsjNum, setOwsjNum] = useState(null);
    const [owsjSubject, setOwsjSubject] = useState('');

    const handleEdit = async () => {
        try {
            onEdit({
                owsjNum,
                owsjSubject
            });
            onClose();
        } catch (error) {
            console.error("Error insert :", error);
        }
    };

    useEffect(() => {
        if (isOpen && post && post.owsjNum && post.owsjSubject) {
            setOwsjNum(post.owsjNum);
            setOwsjSubject(post.owsjSubject);
        } else {
            setOwsjNum(null);
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
                <p>이 포스트는 공지사항으로 등록되었습니다.</p>
                <textarea
                    rows="5"
                    placeholder="주제를 입력하세요..."
                    value={owsjSubject}
                    onChange={(e) => setOwsjSubject(e.target.value)}
                />

                <div style={{display: "flex"}}>
                    {/* <button onClick={onLike} className="btn btn-success">추천하기</button> */}
                    {
                        // isAdmin &&
                        <button onClick={handleEdit} className="btn btn-warning">수정하기</button>
                    }
                    <button onClick={onClose} className="btn btn-primary">닫기</button>
                </div>
            </div>
        </div>
    );
};

export default DetailPostModal;
