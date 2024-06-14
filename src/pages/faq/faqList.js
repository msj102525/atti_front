import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../../styles/faq/faqList.module.css"; // 스타일 파일을 임포트
import Header from '../common/Header';

function FAQ() {
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    // FAQ 데이터를 가져오는 API 호출
    const fetchFaqData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/faq/faqList');
        setFaqList(response.data); // 여기서 response.data를 사용합니다.
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFaqData();
  }, []);

  // FAQ 데이터를 카테고리별로 그룹화
  const groupedFaqs = faqList.reduce((acc, faq) => {
    (acc[faq.faqCategory] = acc[faq.faqCategory] || []).push(faq);
    return acc;
  }, {});

  return (
    <div >
      <Header />
      <div className="flex-grow w-full p-4 h-screen ml-0">
        <h1 className="text-2xl font-bold mb-4 text-center">자주 묻는 질문</h1>
        {Object.keys(groupedFaqs).map((category, index) => (
          <div key={index} className="mb-8 text-left w-full  max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <ul className={`list-none m-0 p-0 ${styles.qna}`}>
              {groupedFaqs[category].map((faq, idx) => (
                <li key={idx} className="border-b border-gray-300 py-2">
                  <input type="checkbox" id={`qna-${index}-${idx}`} className="hidden" />
                  <label htmlFor={`qna-${index}-${idx}`} className="block font-bold text-black cursor-pointer">
                    <span className="mr-2 inline-block"></span>
                    {faq.faqTitle}
                  </label>
                  <div className="hidden text-gray-600 text-sm pl-8">
                    <p>{faq.faqContent}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
