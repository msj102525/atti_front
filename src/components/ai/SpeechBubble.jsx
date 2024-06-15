import React, { useState, useEffect } from 'react';
import styles from "@/styles/ai/aiConsult.module.css";

export default function SpeechBubble({ messages }) {
    const [displayedText, setDisplayedText] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);

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
                setCurrentChar(0);
                setCurrentLine(currentLine + 1);
            }
        }
    }, [currentChar, currentLine, messages]);

    return (
        <hgroup className={styles.speechBubble}>
            {displayedText.map((line, index) => (
                <h1 key={index}>{line}</h1>
            ))}
        </hgroup>
    );
}
