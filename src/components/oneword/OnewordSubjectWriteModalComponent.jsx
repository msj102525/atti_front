import React, {useEffect, useState} from 'react';

const OnewordSubjectWriteModalComponent = ({ isOpen, onClose, onSubmit }) => {
    const [owsjSubject, setOwsjSubject] = useState('');
    const [isPinned, setIsPinned] = useState(false);

    const handleSubmit = async () => {
        try {
            onSubmit({
                owsjSubject
            });
            onClose();
        } catch (error) {
            console.error("Error insert :", error);
        }
    };

    useEffect(()=>{
        setOwsjSubject("")
    },[isOpen])

    if (!isOpen) return null;

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
                <textarea
                    rows="5"
                    placeholder="주제를 입력하세요..."
                    value={owsjSubject}
                    onChange={(e) => setOwsjSubject(e.target.value)}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSubmit}>등록</button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

export default OnewordSubjectWriteModalComponent;
