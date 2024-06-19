import React, { useState, useRef } from "react";
import MintButton from "@/components/common/MintButton";
import Button from "./Button"; // 연두색 및 빨간색 버튼 컴포넌트

const FileUploadButton = ({ onChange, onReset, hospitalFileName }) => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(event);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearSelectedFile = () => {
    setFileName("");
    fileInputRef.current.value = ""; // 파일 입력 필드를 초기화
    onChange({ target: { files: [] } }); // 파일이 초기화되었음을 알림
    onReset(); // 부모 컴포넌트의 상태 초기화
  };

  return (
    <div className="relative inline-block">
      <input
        type="file"
        id="file-upload"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center space-y-2">
        <div className="relative flex items-center justify-center bg-gray-200 h-70 w-85">
          {
            <img
              src={hospitalFileName ? hospitalFileName : "/doctor/hospital.png"}
              alt="Hospital"
              className="object-contain max-w-full max-h-full"
            />
          }
        </div>
        {fileName || hospitalFileName ? (
          <div className="flex space-x-2">
            <Button
              onClick={handleButtonClick}
              text="이미지 수정"
              color="green"
            />
            <Button
              onClick={clearSelectedFile}
              text="이미지 초기화"
              color="red"
            />
          </div>
        ) : (
          <MintButton
            onClick={handleButtonClick}
            text="병원 이미지를"
            text2="업로드 해주세요"
            sizeW="w-48"
            sizeH="h-18"
            fontSize="text-lg"
          />
        )}
      </div>
    </div>
  );
};

export default FileUploadButton;
