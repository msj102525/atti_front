import { useRef, useState } from "react";
import { transcribe } from "@/api/ai/aiApi";

export const useAudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaStreamRef = useRef(null);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia API가 지원되지 않습니다.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          const newAudioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          console.log("오디오 세팅됨 !");
          console.log("newAudioBlob:", newAudioBlob);
          setAudioBlob(newAudioBlob);
          audioChunksRef.current = [];
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      if (error.message === "getUserMedia API가 지원되지 않습니다.") {
        console.error("getUserMedia 실패:", error);
        // getUserMedia가 지원되지 않는 경우 빈 문자열을 처리
        setAudioBlob(new Blob([""], { type: "audio/webm" }));
      } else {
        console.error("Error starting recording:", error);
      }
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    }
  };

  const uploadAudio = async (audioBlob) => {
    if (!audioBlob) {
      return ["녹음이 실패했어요!", "마이크 권한설정을 확인해주세요...."];
    }

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    try {
      const response = await transcribe(formData);
      if (response.data && response.data.transcription) {
        return response.data.transcription; // 서버로부터 받은 텍스트 반환
      } else {
        throw new Error("서버 응답이 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
      return [
        "목소리가 제대로 전달되지 않았어요 !",
        "마이크 권한설정과 연결을 확인하고 다시 시도해주세요 !",
        "이 메세지를 수정해서 답변을 들을 수도 있어요!",
      ];
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
