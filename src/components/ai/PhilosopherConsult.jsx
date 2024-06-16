import { useEffect, useState } from 'react';
import SpeechBubbleRight from './speechBubble/SpeechBubbleRight';
import SpeechBubbleLeft from './speechBubble/SpeechBubbleLeft';
import AudioButton from './AudioButton';
import { useAudioRecorder } from 'src/hooks/audioRecorder';

export default function PhilosopherConsult({ philosopher, setMessageSequence }) {
    const [messages, setMessages] = useState([]);
    const [audioStatus, setAudioStatus] = useState("mike");
    const [audioValid, setAudioValid] = useState(false);
    const [hoverEnabled, setHoverEnabled] = useState(false);
    const [messageSpeed, setMessageSpeed] = useState(false);
    const [answerValid, setAnswerValid] = useState(false);
    const [answerMessage, setAnswerMessage] = useState("");
    const [concern, setConcern] = useState(""); // concern 상태 추가

    const {
        recording,
        startRecording,
        stopRecording,
        uploadAudio,
        audioBlob,
    } = useAudioRecorder();

    useEffect(() => {
        if (audioBlob) {
            (async () => {
                let answer = await uploadAudio(audioBlob);
                setAnswerValid(true);
                setAnswerMessage(answer);
            })();
        }
    }, [audioBlob]);

    const handleAudio = async () => {
        if(answerMessage){
            setHoverEnabled(false);
            setAudioStatus("mike");
            setAudioValid(false);
            setMessageSpeed(false);
            setAnswerValid(false);
            setAnswerMessage("");
            setMessages(["호오.... 그런일이..."]);
            setMessageSequence(0);
        } else {
            if (!audioValid) {
                if (!recording) {
                    startRecording();
                    setMessages([".....", ".....", "......", "더 말씀해보시게...."]);
                    setAudioValid(true);
                    setHoverEnabled(true);
                    setMessageSpeed(true);
                } else {
                    stopRecording();
                    setMessages(["그런일이 있었구만....."]);
                    setMessageSequence(2)
                    setAudioValid(false);
                    setAudioStatus("mike");
                    setHoverEnabled(false);
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
    console.log(concern)
    }

    useEffect(() => {
        let initMessage = [];
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
                    <SpeechBubbleRight messages={messages} slow={messageSpeed} answerValid={answerValid} onAnswerListen={handleAnswerListen} setMessageSequence={setMessageSequence}/>
                    <div className='ml-6 w-1/3'>
                        <img src={`/philosopher/${philosopher.model}.webp`} alt="Philosopher" className="rounded-lg shadow-md max-w-full h-auto" />
                    </div>
                </div>
                {answerValid && (
                    <div className={`flex justify-between mt-12`}>
                        <div><img src='doctor.png' alt='Doctor'/></div>
                        <SpeechBubbleLeft messages={answerMessage} answerValid={answerValid} setConcern={setConcern} />
                    </div>
                )}
                <div className='mt-12'>
                    {answerValid && <div className='text-center text-xl text-red-500'>재녹음</div>}
                    <AudioButton
                        audioValid={audioValid}
                        statusImage={audioStatus}
                        onClickFunction={handleAudio}
                        onHoverFunction={handleHover}
                        onLeaveFunction={handleLeave}
                    />
                </div>
            </div>
        </div>
    );
}
