import { useRef, useState } from 'react';
import axios from '@/api/axiosApiForFlask'; 

export const useAudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            setAudioBlob(audioBlob);
            audioChunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    const uploadAudio = async () => {
        if (!audioBlob) return null;
    
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');
    
        try {
            const response = await axios.post('/upload/audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data; // 서버 응답 데이터를 반환
        } catch (error) {
            console.error('Error uploading audio:', error);
            return null; // 에러 발생 시 null 반환
        }
    };
    

    return {
        recording,
        startRecording,
        stopRecording,
        uploadAudio,
        audioBlob,
    };
};
