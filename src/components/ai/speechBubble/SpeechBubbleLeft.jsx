import React, { useState, useEffect } from "react";
import styles from "@/styles/ai/speechBubbleLeft.module.css";

export default function SpeechBubbleLeft({
  messages,
  slow = false,
  answerValid = false,
  setConcern,
  audioEnd = false,
}) {
  const [displayedText, setDisplayedText] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [concern, updateConcern] = useState("");
  const [hoverState, setHoverState] = useState(false);

  const paragraphDelay = slow ? 1000 : 100;

  useEffect(() => {
    if (typeof messages === "string") {
      messages = [messages];
    }
    // 메시지 배열을 개별 요소로 처리하고, 줄바꿈을 추가
    const combinedMessage = messages.join("\n");
    setDisplayedText(combinedMessage.split("\n").map(() => ""));
    setCurrentLine(0);
    setCurrentChar(0);
    updateConcern(combinedMessage);
  }, [messages]);

  useEffect(() => {
    if (currentLine < displayedText.length) {
      if (currentChar < messages[currentLine]?.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => {
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
  }, [currentChar, currentLine, messages, slow, paragraphDelay, displayedText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    updateConcern(newText);
    setConcern(newText); // 부모 컴포넌트로 concern 전달
  };

  return (
    <div className={styles.speechBubbleContainer}>
      <hgroup className={styles.speechBubble}>
        <textarea
          className="w-auto h-auto min-w-[600px] min-h-[250px] text-xl leading-relaxed text-gray-800 font-sans p-4 resize-none rounded-md focus:outline-none"
          value={concern}
          onChange={handleTextChange}
          readOnly={audioEnd} // audioEnd가 true면 읽기 전용으로 변경
        />
        {answerValid && !audioEnd && (
          <div className="absolute text-base text-xl text-red-500 right-5 bottom-5">
            마음에 들지 않으신가요? 답변을 수정하거나 재녹음을 해보세요!
          </div>
        )}
        {audioEnd && (
          <div className="flex justify-end">
            <div
              className="flex items-center justify-center w-48 mr-5 bg-purple-300 border-4 border-black cursor-pointer rounded-3xl hover:bg-purple-500 "
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
            >
              내 감정은?
            </div>
            {!hoverState ? (
              <img
                className="w-20"
                src="/ai/goToEmotionConsult.png"
                alt="Emotion Consult"
              />
            ) : (
              <img
                className="w-20"
                src="/ai/smileFace.png"
                alt="Emotion Consult"
              />
            )}
          </div>
        )}
      </hgroup>
    </div>
  );
}
