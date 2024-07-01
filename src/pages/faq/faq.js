import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import FAQItem from './faqItem';
import Header from '../common/Header';
import Pagination from "@/components/common/page";  // Pagination 컴포넌트를 가져옵니다.
import styles from '../../styles/faq/faqModal.module.css'; // 모듈 스타일 가져오기

Modal.setAppElement('#__next'); // 이 줄을 추가하여 접근성을 설정합니다.

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState({});
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // isAdmin 상태 추가
  const [isEditMode, setIsEditMode] = useState(false); // 모드 상태 추가
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가
  const [pageCount, setPageCount] = useState(0); // 총 페이지 수 상태 추가
  const itemsPerPage = 10; // 페이지 당 항목 수

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  useEffect(() => {
    fetchFAQs(currentPage);
  }, [currentPage]);

  const fetchFAQs = async (page) => {
    try {
      const response = await axios.get(`http://localhost:8080/faq/faq?page=${page}&size=${itemsPerPage}`);
      setFaqData(response.data.content);
      setPageCount(response.data.totalPages);
      setCategories(['All', ...new Set(response.data.content.map(faq => faq.faqCategory))]);
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
    }
  };

  const filteredFAQs = faqData
    .filter(faq => selectedCategory === 'All' || faq.faqCategory === selectedCategory)
    .filter(faq =>
      faq.faqTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.faqContent.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleToggle = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleEdit = (index) => {
    setCurrentFAQ(filteredFAQs[index]);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const faqToDelete = filteredFAQs[index];

    if (window.confirm('정말로 이 FAQ를 삭제하시겠습니까?')) {
      axios.delete(`http://localhost:8080/faq/faq/${faqToDelete.faqNum}`)
        .then(() => {
          fetchFAQs(currentPage);
        })
        .catch(error => {
          console.error('Error deleting FAQ:', error);
        });
    }
  };

  const handleModalSubmit = () => {
    if (isEditMode) {
      // 수정 모드
      const updatedFAQ = { ...currentFAQ };

      axios.put(`http://localhost:8080/faq/faq/${currentFAQ.faqNum}`, updatedFAQ)
        .then(response => {
          fetchFAQs(currentPage);
          setIsModalOpen(false);
        })
        .catch(error => {
          console.error('Error updating FAQ:', error);
        });
    } else {
      // 새 FAQ 작성 모드
      const newFAQ = { ...currentFAQ };
      if (currentFAQ.faqCategory === 'new' && currentFAQ.newCategory) {
        newFAQ.faqCategory = currentFAQ.newCategory;
      }

      delete newFAQ.newCategory;

      console.log(currentFAQ, "프로젝트");
      console.log('Sending FAQ data:', newFAQ);

      axios.post('http://localhost:8080/faq/faq', newFAQ)
        .then(response => {
          fetchFAQs(currentPage);
          setIsModalOpen(false);
        })
        .catch(error => {
          console.error('Error creating new FAQ:', error);
        });
    }
  };

  const handleNewFAQ = () => {
    setCurrentFAQ({ faqTitle: '', faqContent: '', faqCategory: '' });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-10">자주 묻는 질문</h2>
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between">
            <div className="flex flex-wrap">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 mr-2 mb-2 sm:mb-0 rounded-full ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {filteredFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.faqTitle}
              answer={faq.faqContent}
              isOpen={openFAQ === index}
              onToggle={() => handleToggle(index)}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
              isAdmin={isAdmin} // isAdmin 상태를 FAQItem 컴포넌트로 전달
            />
          ))}
          
          <div className="mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-8 px-4 py-2 border rounded-full w-full sm:w-64"
            />
            
          </div>
        </div>
      </div>
      
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className="text-2xl mb-4">{isEditMode ? 'FAQ 수정' : '새 FAQ 작성'}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            value={currentFAQ.faqTitle || ''}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, faqTitle: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">내용</label>
          <textarea
            value={currentFAQ.faqContent || ''}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, faqContent: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">카테고리</label>
          <select
            value={currentFAQ.faqCategory || ''}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, faqCategory: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            {categories.filter(category => category !== 'All').map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
            <option value="new">새 카테고리 추가</option>
          </select>
          {currentFAQ.faqCategory === 'new' && (
            <input
              type="text"
              placeholder="새 카테고리 입력"
              value={currentFAQ.newCategory || ''}
              onChange={(e) => setCurrentFAQ({ ...currentFAQ, newCategory: e.target.value })}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleModalSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            저장
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            취소
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
