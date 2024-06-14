import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MintButton from "@/components/common/MintButton";  // MintButton 컴포넌트를 임포트합니다.
import Header from '../common/Header';
import Footer from '../common/Footer';
import axios from "axios";


const BoardWrite = () => {
  const router = useRouter();
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [importance, setImportance] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form 데이터
    const formData = {
      boardTitle,
      boardContent,
      importance,
    };

    // 여기서 formData를 서버로 전송하는 코드를 추가합니다.
    // 예: axios.post('your_api_endpoint', formData)
    axios.post(`http://localhost:8080/board`, formData)

    console.log(formData);

    // 서버로 데이터 전송 후, 리스트 페이지로 리디렉션
    router.push('/board/boardList');
  };

  const moveBack = () => {
    router.push('/board/boardList');
  };

  const handleImportanceChange = (event) => {
    setImportance(event.target.checked ? 2 : 1);
  };

  return (
    <div>
        <Header/>
    <div className="main-container pt-24">
      <div className="container mx-auto p-6 border border-dashed border-black w-[800px]">
        <hr />
        <form id="writeForm" onSubmit={handleSubmit} className="space-y-4">
          <input
            className="titleInput w-full p-4 border border-gray-300 rounded mb-4"
            type="text"
            name="boardTitle"
            maxLength="44"
            placeholder="제목을 입력해주세요 최대 44글자"
            required
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
          />
          <hr />
          <textarea
            className="contentbox w-full p-4 border border-gray-300 rounded mb-4"
            name="boardContent"
            rows="20"
            maxLength="254"
            placeholder="내용을 입력해주세요 최대 254글자"
            required
            value={boardContent}
            onChange={(e) => setBoardContent(e.target.value)}
          />
          <hr />
          <div className="flex items-center space-x-2">
            <label htmlFor="importance" className="font-medium">중요도</label>
            <input
              id="importance"
              type="checkbox"
              name="importance"
              checked={importance === 2}
              onChange={handleImportanceChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="flex space-x-4">
            <MintButton
              onClick={handleSubmit}
              text="글쓰기"
              sizeW="w-24"
              sizeH="h-12"
              fontSize="text-lg"
            />
            <MintButton
              onClick={moveBack}
              text="돌아가기"
              sizeW="w-24"
              sizeH="h-12"
              fontSize="text-lg"
            />
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default BoardWrite;