import React, { useState } from 'react';
import styles from "../../styles/chat/chat.module.css"; // 스타일 파일을 임포트
import Header from '../common/header';
import Footer from '../common/footer';

const Chat = () => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleStarClick = (value) => {
        setSelectedRating(value);
    };

    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    
    const submitRating = () => {
        // 평점 제출 함수
        if (selectedRating !== null) {
            alert(`Rating submitted: ${selectedRating}`);
            // 서버에 제출하는 코드 추가 가능
        } else {
            alert('Please select a rating');
        }
    };

    const handleMessageSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, type: 'sent' }]);
            setInput('');
        }
    };

    const handleChatClose = () => {
        // 채팅 종료 시 처리할 로직을 여기에 추가합니다.
        alert("채팅이 종료되었습니다.");
        setMessages([]);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleMessageSend();
        }
    };

    return (
    <div>
        <Header />
        <div className={styles.container}>
            
            {/* 왼쪽 영역 */}
            <div className={styles.leftsection}>
            
                <div className={styles.photo}>
                <img alt="의사" src="../../doctor.png" width="300px" height="auto" style={{ border: '1px solid black' }}/>
                </div>
                <hr className={styles.hr} />
                <div className={styles.details}>
                    <h2 className={styles.title}>허 준 상담사님의 간단한 소개</h2>
                    <div className={styles.section}>
                        <div className={styles.icon}>👔</div>
                        <div className={styles.content}>
                            <h3>경력</h3>
                            <p>유희춘의 병을 고침</p>
                            <p>선조 임금의 병을 고침</p>
                            <p>동의보감 저자</p>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.icon}>🎓</div>
                        <div className={styles.content}>
                            <h3>학력</h3>
                            <p>성균관대학교 수석졸업</p>
                        </div>
                    </div>
                </div>
                <hr className={styles.hr} />
                <div className={styles.ratingContainer}>
                    <label className={styles.label}>허 준 상담사님과의 상담은 어떠신가요?</label>
                    <div className={styles.starRating}>
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label
                                key={ratingValue}
                                onMouseEnter={() => handleMouseEnter(ratingValue)}
                                onMouseLeave={handleMouseLeave}
                            >
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                className={styles.star}
                                onClick={() => handleStarClick(ratingValue)}
                            />
                            <span
                                className={`${styles.starSpan} ${(hoverRating || selectedRating) >= ratingValue ? styles.filled : ''}`}
                            >☆</span>
                            </label>
                        );
                    })}
                    </div>
                    <button className={styles.submitBtn} onClick={() => alert(`Rating submitted: ${selectedRating}`)}>
                    제출
                    </button>
                </div>
            </div> {/* 왼쪽 영역 끝 */}


            {/* 수직선 */}
            <div className={styles.verticalline}></div>
            {/* 오른쪽 영역 */}
            <div className={styles.rightsection}>
            <div className={styles.chatWindow}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${styles.message} ${styles[msg.type]}`}>
                            <div className={styles.text}>{msg.text}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.inputArea}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="메시지를 입력하세요..."
                    />
                    <div className={styles.buttonArea}>
                        <button className={styles.sendButton} onClick={handleMessageSend}>
                            전송
                        </button>
                        <button className={styles.closeButton} onClick={handleChatClose}>
                            종료
                        </button>
                    </div>
                </div>
            </div>{/* 오른쪽 영역 끝*/}
        </div>
        <Footer/>
    </div>
    );
};

export default Chat;
