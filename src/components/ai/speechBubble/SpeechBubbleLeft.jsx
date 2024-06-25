import React, { useState, useEffect } from "react";
import styles from "@/styles/ai/speechBubbleLeft.module.css";
import { sentimentAnalysis } from "@/api/ai/aiApi";

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

  const handleSentimentAnalysis = async () => {
    // console.log(concern);
    try {
      const result = await sentimentAnalysis(concern);

      if (result.status == 200) {
        console.log(result.data);

        const { document: { confidence: { negative, neutral, positive } } } = result.data;
        const { sentences: [{ content }] } = result.data;


        console.log(content)
        console.log(negative)
        console.log(neutral)
        console.log(positive)

        let sentence = "";

        if (positive >= 80) {
          sentence = "당신은 정말 대단해요! 훌륭한 일을 해내고 있군요 :)";
        } else if (positive >= 60 && positive < 80) {
          sentence = "긍정적인 마음가짐으로 멋진 일들을 이룰 수 있어요 :)";
        } else if (positive >= 40 && positive < 60) {
          sentence = "긍정적으로 생각하면 해결할 수 있는 문제들이에요 :)";
        } else if (neutral >= 80) {
          sentence = "상황을 잘 이해하고 고려하는 당신, 멋져요! :)";
        } else if (neutral >= 60 && neutral < 80) {
          sentence = "중립적인 관점을 유지하며 문제를 해결할 수 있을 거예요 :)";
        } else if (neutral >= 40 && neutral < 60) {
          sentence = "여러 감정을 조율하며 최선의 결정을 내릴 수 있을 거에요 :)";
        } else if (negative >= 80) {
          sentence = "어려운 일을 겪고 있지만, 이 역시 지나가는 일일 거예요 :)";
        } else if (negative >= 60 && negative < 80) {
          sentence = "부정적인 감정을 이겨내고 긍정적으로 다가가 보세요 :)";
        } else if (negative >= 40 && negative < 60) {
          sentence = "마음의 변화와 함께 새로운 긍정을 찾아보는 것이 중요할 거예요 :)";
        } else {
          sentence = "복잡한 감정을 가진 상황이지만, 모든 것이 잘 해결될 거예요 :)";
        }


        updateConcern(`${content}\n\n ${sentence}`);

      } else {
        console.error('감정분석 실패', result.status);
      }

    } catch (err) {
      console.error(err);
    }
  }

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
              onClick={handleSentimentAnalysis}
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
