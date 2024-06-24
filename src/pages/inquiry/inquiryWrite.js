import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { createInquiry } from '@/api/inquiry/inquiry';
import styles from "@/styles/inquiry/inquriWirte.module.css";

const InquiryWrite = () => {  
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 로컬 스토리지에서 userId 가져오기
    const userId = localStorage.getItem('userId');

    // Form 데이터
    const formData = {
      title,
      content,
      userId,
    };

    try {
      // formData를 서버로 전송
      await createInquiry(formData);
      // 서버로 데이터 전송 후, 리스트 페이지로 리디렉션
      router.push('/inquiry');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const moveBack = () => {
    router.push('/inquiry/inquiryList');
  };

  return (
    <div>
      <Header />
      <div className="main-container pt-24">
        <div className={styles.container}>
          <h3 className={styles.title}>문의사항 작성</h3>
          <hr />
          <form id="writeForm" onSubmit={handleSubmit} className="space-y-4">
            <input
              className={styles.titleInput}
              type="text"
              name="title" // 필드 이름을 소문자로 변경
              maxLength="44"
              placeholder="제목을 입력해주세요 최대 44글자"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <hr />
            <textarea
              className={styles.contentbox}
              name="content" // 필드 이름을 소문자로 변경
              rows="20"
              maxLength="254"
              placeholder="내용을 입력해주세요 최대 254글자"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <hr />
            <div className={styles.btnbox}>
              <button type="submit">글쓰기</button>
              <button type="button" onClick={moveBack}>돌아가기</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InquiryWrite;
