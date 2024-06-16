import { useRef, useState, useEffect } from 'react';
import axios from '@/api/axiosApiForFlask'; 

export const useAudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const mediaStreamRef = useRef(null); // 스트림 참조 추가
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream; // 스트림 참조 저장
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                console.log('Data available:', event.data); // 로그 추가
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                console.log('Recording stopped, processing chunks...');
                if (audioChunksRef.current.length > 0) {
                    const newAudioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    setAudioBlob(newAudioBlob); // 상태 업데이트
                    console.log('Audio blob created:', newAudioBlob); // 로그 추가
                    audioChunksRef.current = [];
                } else {
                    console.error('No audio data collected.');
                }
            };

            mediaRecorderRef.current.start();
            console.log('Recording started');
            setRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setRecording(false);
            console.log('Recording stopped');

            // 스트림의 모든 트랙을 중지
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
                mediaStreamRef.current = null;
            }
        } else {
            console.error('No active recording to stop.');
        }
    };

    const uploadAudio = async (audioBlob) => {
        console.log('Uploading audio blob:', audioBlob); // 로그 추가

        if (!audioBlob) return ["녹음이 실패했어요!", "마이크 권한설정을 확인해주세요...."];
    
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.webm');
    
        try {
            const response = await axios.post('/upload/audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data; // 서버 응답 데이터를 반환
        } catch (error) {
            console.error('Error uploading audio:', error);
            return ["녹음이 실패했어요!", audioBlob];
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
