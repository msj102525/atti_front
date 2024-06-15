import { useRouter } from 'next/router';
import styles from '@/styles/ai/aiConsult.module.css';
import SpeechBubble from './SpeechBubble';
import { useEffect, useState } from 'react';

export default function PhilosopherConsult({ philosopher }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        let initMessage = [];
        //철학자 소개 리스트인지 아닌지 => 반응형이라 문자열이 길면 div사이즈가 커지는문제때문에 소개가 길면 리스트로 바꿔씀
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
    }, [philosopher])
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-2/3 bg-gray-300 p-10 rounded-lg shadow-xl'>
                <div className="flex justify-between items-center w-full">
                    <SpeechBubble messages={messages} />
                    <div className='ml-6 w-1/3'>
                        <img
                            src={`/philosopher/${philosopher.model}.webp`}
                            alt="Philosopher"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>
                {/* 음성 입력 버튼 */}
                <div className='flex justify-center items-center mt-10'>
                    <button className="p-4 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:bg-red-700 focus:outline-none">
                        <span className="text-2xl">🎤</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
