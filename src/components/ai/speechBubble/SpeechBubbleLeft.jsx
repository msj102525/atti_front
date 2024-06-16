import React, { useState, useEffect } from 'react';
import styles from '@/styles/ai/speechBubbleLeft.module.css';

export default function SpeechBubbleLeft({ messages, slow = false, answerValid=false, setConcern }) {
    const [displayedText, setDisplayedText] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [concern, updateConcern] = useState("");
    const paragraphDelay = slow ? 1000 : 100;

    useEffect(() => {
        setDisplayedText(messages.map(() => ""));
        setCurrentLine(0);
        setCurrentChar(0);
        updateConcern(messages.join(' '));
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

    const handleTextChange = (e) => {
        const newText = e.target.value;
        updateConcern(newText);
        setConcern(newText); // 부모 컴포넌트로 concern 전달
    };

    return (
        <div className={styles.speechBubbleContainer}>
            <hgroup className={styles.speechBubble}>
                <textarea
                    className="w-full h-full min-w-[400px] min-h-[250px] text-xl leading-relaxed text-gray-800 font-sans p-4 resize-none rounded-md focus:outline-none"
                    value={concern}
                    onChange={handleTextChange}
                />
                {answerValid && (
                    <div className="absolute right-5 bottom-5 text-red-500 text-base text-xl">
                        마음에 들지 않으신가요? 답변을 수정하거나 재녹음을 해보세요!
                    </div>
                )}
            </hgroup>
        </div>
    );
}
