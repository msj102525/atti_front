import { useRouter } from 'next/router';
import SpeechBubble from './SpeechBubble';
import { useEffect, useState } from 'react';
import AudioButton from './AudioButton';
import { useAudioRecorder } from 'src/hooks/audioRecorder';

export default function PhilosopherConsult({ philosopher }) {
  const [messages, setMessages] = useState([]);
  const [audioStatus, setAudioStatus] = useState("mike");
  const [audioValid, setAudioValid] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [messageSpeed, setMessageSpeed] = useState(false);
  const [question, setQuestion] = useState("");
  const [answerValid, setAnswerValid] = useState(false)

  //녹음 훅----------------------------
  const {
    recording,
    startRecording,
    stopRecording,
    uploadAudio,
    audioBlob,
  } = useAudioRecorder();

  const handleUpload = () => {
    uploadAudio();
    // 업로드 후 추가 작업
};
  //-----------------


  const handleAudio = async () => {
    console.log(audioValid)
    console.log(recording)
    if (!audioValid) {
        if (!recording) {
            startRecording();
            setMessages([".....", ".....", "......", "더 말씀해보시게...."]);
        } else {
            stopRecording();
            setMessages(["호오.... 그런일이..."]);
            setAnswerValid(true);
            await uploadAudio(); // 녹음을 정지하고 데이터를 서버로 전송
        }
        setAudioValid(true);
        setHoverEnabled(true);
        setMessageSpeed(true);
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

  useEffect(() => {
    let initMessage = [];
    // 철학자 소개 리스트인지 아닌지 => 반응형이라 문자열이 길면 div사이즈가 커지는 문제 때문에 소개가 길면 리스트로 바꿔씀
    if (Array.isArray(philosopher.introduce)) {
      for (let message of philosopher.introduce) {
        initMessage.push(message);
      }
    } else if (typeof philosopher.introduce === 'string') {
      initMessage.push(philosopher.introduce);
    }
    initMessage.push('나 ' + philosopher.name + '에게');
    initMessage.push('편하게 말해보시게....');
    setMessages(initMessage);
  }, [philosopher]);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-2/3 bg-gray-300 p-10 rounded-lg shadow-xl'>
        <div className="flex justify-between items-center w-full">
          <SpeechBubble messages={messages} slow={messageSpeed} answerValid={answerValid}/>
          <div className='ml-6 w-1/3'>
            <img
              src={`/philosopher/${philosopher.model}.webp`}
              alt="Philosopher"
              className="rounded-lg shadow-md max-w-full h-auto"
            />
          </div>
        </div>
        <AudioButton
          audioValid={audioValid}
          statusImage={audioStatus}
          onClickFunction={handleAudio}
          onHoverFunction={handleHover}
          onLeaveFunction={handleLeave}
        />
      </div>
    </div>
  );
}
