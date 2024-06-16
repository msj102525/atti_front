import React, { useState, useEffect } from 'react';
import styles from "@/styles/ai/speechBubbleRight.module.css";

export default function SpeechBubbleRight({ messages, slow = false, answerValid = false, onAnswerListen, setMessageSequence }) {
    const [displayedText, setDisplayedText] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);

    const paragraphDelay = slow ? 1000 : 100;

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
                    <div className="absolute right-5 bottom-5 text-blue-500 text-xl cursor-pointer">
                        답변 듣기
                    </div>

                )}
            </hgroup>
        </div>
    );
}
