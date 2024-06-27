import React, { useEffect, useState } from 'react';

const OnewordSubjectWriteModalComponent = ({ isOpen, onClose, onSubmit }) => {
    const [owsjSubject, setOwsjSubject] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        try {
            if (owsjSubject.trim() === '') {
                setErrorMessage('*** 오늘 한 줄 주제를 입력하세요.***');
                return; // Exit early if subject is empty
            }

            onSubmit({
                owsjSubject
            });
            onClose();
        } catch (error) {
            console.error("Error insert :", error);
        }
    };

    useEffect(() => {
        setOwsjSubject("");
        setErrorMessage('');
    }, [isOpen])

    useEffect(() => {
        // Clear error message when owsjSubject changes
        setErrorMessage('');
    }, [owsjSubject]);

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
                {errorMessage && (
                    <p style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                        <button
                            style={{
                                backgroundColor: '#28A745',
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '8px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginRight: '8px'
                            }}
                            onClick={handleSubmit}
                        >
                            등록
                        </button>
                        <button
                            style={{
                                backgroundColor: '#6B7280',
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '8px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginRight: '8px'
                            }}
                            onClick={onClose}
                        >
                            닫기
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default OnewordSubjectWriteModalComponent;
