import { useEffect, useState } from "react";
import SpeechBubbleRight from "./speechBubble/SpeechBubbleRight";
import SpeechBubbleLeft from "./speechBubble/SpeechBubbleLeft";
import AudioButton from "./AudioButton";
import { useAudioRecorder } from "src/hooks/audioRecorder";
import { cosultToPhilosopher } from "src/api/ai/aiApi";

export default function PhilosopherConsult({
  philosopher,
  setMessageSequence,
  messageSequence,
}) {
  const [messages, setMessages] = useState([]);
  const [audioStatus, setAudioStatus] = useState("mike");
  const [audioValid, setAudioValid] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [messageSpeed, setMessageSpeed] = useState(false);
  const [answerValid, setAnswerValid] = useState(false);
  const [answerMessage, setAnswerMessage] = useState("");
  const [concern, setConcern] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // 서버 응답 대기 상태
  const [repeatMessages, setRepeatMessages] = useState(false);
  const [audioEnd, setAudioEnd] = useState(false);

  const { recording, startRecording, stopRecording, uploadAudio, audioBlob } =
    useAudioRecorder();

  useEffect(() => {
    if (audioBlob) {
      handleUpload();
    }
  }, [audioBlob]);

  const handleUpload = async () => {
    try {
      let answer = await uploadAudio(audioBlob);
      setIsFetching(false);
      setAnswerValid(true);
      setRepeatMessages(false);
      setAnswerMessage(answer);
      setMessageSequence(3);
      setMessageSpeed(false);
      setMessages([
        "자네가 한 말을 내가 제대로 들은건지 모르겠군 ........",
        "빠진부분이 있거나 이상한 부분이 있다면,",
        "원하는대로 수정하고 답변듣기 버튼을 눌러보게....",
      ]);
    } catch (error) {
      setIsFetching(false);
      setAnswerValid(true);
      setAnswerMessage("서버와의 통신에 문제가 발생했습니다.");
    }
  };

  const handleAudio = async () => {
    if (isRecording) {
      setHoverEnabled(false);
      setAudioStatus("mike");
      setAudioValid(false);
      setMessageSpeed(false);
      setAnswerValid(false);
      setAnswerMessage("");
      setMessages(["호오.... 그런일이..."]);
      setMessageSequence(0);
      setIsRecording(false);
      setRepeatMessages(false);
    } else {
      if (!audioValid) {
        if (!recording) {
          startRecording();
          setMessages([".....", ".....", "......", "더 말씀해보시게...."]);
          setRepeatMessages(true);
          setAudioValid(true);
          setHoverEnabled(true);
          setMessageSpeed(true);
        } else {
          stopRecording();
          setMessages(["호오.... 그런일이....."]);
          setMessageSequence(2);
          setAudioValid(false);
          setAudioStatus("mike");
          setHoverEnabled(false);
          setIsRecording(true);
          setIsFetching(true); // 서버 응답 대기 시작
        }
      }
    }
  };

  const handleHover = () => {
    if (hoverEnabled) {
      setAudioValid(false);
      setAudioStatus("stop");
    }
  };

  const handleLeave = () => {
    if (hoverEnabled) {
      setAudioValid(true);
      setAudioStatus("mike");
    }
  };

  const handleAnswerListen = async () => {
    try {
      // 비동기 작업이 완료될 때까지 기다림
      setAudioEnd(true);
      setAnswerValid(false);
      setAudioValid(true);
      setMessageSequence(4);
      setMessageSpeed(true);
      setMessages(["자네의 고민.. 잘 들었네 ..", "잠시 고민좀 해보겠네 ...."]);
      const answer = await cosultToPhilosopher(philosopher.model, concern);

      let answerData = answer.data;
      // 답변 온 걸 .으로 분리해서 리스트로 만듦
      let chunks = [];
      for (let i = 0; i < answerData.length; i += 25) {
        chunks.push(answerData.slice(i, i + 25).trim());
      }
      let messageList = chunks.filter((chunk) => chunk.length > 0);
      setRepeatMessages(false);
      setMessages(messageList);
      setMessageSequence(5);
      setAnswerValid(true);
      setAnswerMessage(concern);
    } catch (error) {
      // 오류 처리
      console.error("Error fetching answer:", error);
    }
  };

  useEffect(() => {
    let initMessage = [];
    if (Array.isArray(philosopher.introduce)) {
      for (let message of philosopher.introduce) {
        initMessage.push(message);
      }
    } else if (typeof philosopher.introduce === "string") {
      initMessage.push(philosopher.introduce);
    }
    initMessage.push("나 " + philosopher.name + "에게");
    initMessage.push("편하게 말해보시게....");
    setMessages(initMessage);
  }, [philosopher]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2/3 p-10 bg-gray-300 rounded-lg shadow-xl">
        <div className="flex items-center justify-between w-full">
          <SpeechBubbleRight
            messages={messages}
            slow={messageSpeed}
            answerValid={answerValid}
            onAnswerListen={handleAnswerListen}
            setMessageSequence={setMessageSequence}
            repeatMessages={repeatMessages}
            messageSequence={messageSequence}
          />
          <div className="w-1/3 ml-6">
            <img
              src={`/philosopher/${philosopher.model}.webp`}
              alt="Philosopher"
              className="h-auto max-w-full rounded-lg shadow-md"
            />
          </div>
        </div>
        {answerValid && (
          <div className={`flex justify-between mt-12`}>
            <div className="w-1/3">
              <img src="doctor.png" alt="Doctor" />
            </div>
            <SpeechBubbleLeft
              messages={answerMessage}
              answerValid={answerValid}
              setConcern={setConcern}
              audioEnd={audioEnd}
            />
          </div>
        )}
        <div className="mt-12">
          {answerValid && !audioEnd && (
            <div className="text-xl text-center text-red-500">재녹음</div>
          )}
          {!audioEnd && (
            <AudioButton
              audioValid={audioValid}
              statusImage={audioStatus}
              onClickFunction={handleAudio}
              onHoverFunction={handleHover}
              onLeaveFunction={handleLeave}
              disabled={isFetching} // 버튼 비활성화
            />
          )}
        </div>
      </div>
    </div>
  );
}
