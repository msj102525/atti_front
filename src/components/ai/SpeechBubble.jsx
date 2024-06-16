import React, { useState, useEffect } from 'react';
import styles from "@/styles/ai/aiConsult.module.css";

export default function SpeechBubble({ messages, slow = false, answerValid=false }) {
    const [displayedText, setDisplayedText] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);

    // 문단 사이의 기본 지연 시간 (ms)
    const paragraphDelay = slow ? 1000 : 100; // slow가 true이면 1초, 아니면 0.1초

    // messages가 변경될 때마다 초기화
    useEffect(() => {
        setDisplayedText(messages.map(() => ""));
        setCurrentLine(0);
        setCurrentChar(0);
    }, [messages]);

    useEffect(() => {
        if (currentLine < messages.length) {
            if (currentChar < messages[currentLine].length) {
                const timer = setTimeout(() => {
                    setDisplayedText(prev => {
                        const newText = [...prev];
                        newText[currentLine] += messages[currentLine][currentChar];
                        return newText;
                    });
                    setCurrentChar(currentChar + 1);
                }, 50);
                return () => clearTimeout(timer);
            } else {
                const delay = slow ? paragraphDelay : 0;
                const timer = setTimeout(() => {
                    setCurrentChar(0);
                    setCurrentLine(currentLine + 1);
                }, delay);
                return () => clearTimeout(timer);
            }
        }
    }, [currentChar, currentLine, messages, slow, paragraphDelay]);

    return (
        <div className={styles.speechBubbleContainer}>
        <hgroup className={styles.speechBubble}>
            {displayedText.map((line, index) => (
                <h1 key={index}>{line}</h1>
            ))}
            {answerValid && (
                <div className={styles.answerText}>
                    답변 듣기
                </div>
            )}
        </hgroup>
        </div>
    );
}
