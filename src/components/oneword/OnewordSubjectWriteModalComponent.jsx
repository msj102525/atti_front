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
                alignItems: 'center', // Center items horizontally
            }}>
                <h1 style={{ fontSize: '1.2em', marginTop: '10px', marginBottom: '10px' }}>** 오늘 한 줄 주제 등록** </h1>
                <textarea
                    rows="10"
                    cols="30"
                    placeholder="오늘 한 줄 주제를 입력하세요..."
                    value={owsjSubject}
                    onChange={(e) => setOwsjSubject(e.target.value)}
                    style={{ borderColor: 'gray', borderWidth: '2px', borderStyle: 'solid' }}
                />
                <div>
                    {errorMessage && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</p>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                        {/* <button
                            style={{
                                backgroundColor: '#28A745',
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '8px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginRight: '8px',
                                flex: '1' // Expand button to fill container width
                            }}
                            onClick={handleSubmit}
                        >
                            등록
                        </button> */}

                        <button
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: '#3b82f6',
                                color: '#fff',
                                fontWeight: 'bold',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.25rem',
                                marginRight: '0.5rem',
                                cursor: 'pointer', // 마우스 포인터를 변경하여 버튼이 클릭 가능함을 나타냄
                                transition: 'background-color 0.3s ease', // 배경색 변화 부드럽게
                                flex: '1' // Expand button to fill container width
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                        >
                            등록
                        </button>

                        {/* <button
                            style={{
                                backgroundColor: '#6B7280',
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '8px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginRight: '8px',
                                flex: '1' // Expand button to fill container width
                            }}
                            onClick={onClose}
                        >
                            닫기
                        </button> */}

                        <button
                            onClick={onClose}
                            style={{
                                backgroundColor: '#4b5563',
                                color: '#fff',
                                fontWeight: 'bold',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.25rem',
                                marginRight: '0.5rem',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease', // 배경색 변화 부드럽게
                                flex: '1' // Expand button to fill container width
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#1f2937'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#4b5563'}
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
