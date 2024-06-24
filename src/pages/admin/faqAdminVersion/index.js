import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import { getFaqAdminVersionList, deleteFaqAdminVersion } from "@/api/admin/adminboard";
import { handleAxiosError } from "@/api/errorAxiosHandle";
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import axios from 'axios';
import styles from "@/styles/admin/faqAdminVersion.module.css"; // 기존 스타일 유지
import modalstyles from '@/styles/faq/faqModal.module.css';


// QueryClient 생성
const queryClient = new QueryClient();

const FaqAdminVersionListComponent = observer(() => {
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const queryClient = useQueryClient();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentFAQ, setCurrentFAQ] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [searchType, setSearchType] = useState('id');
    const [searchParams, setSearchParams] = useState({ searchField: '', searchInput: '' });

    const searchField = searchType === 'id' ? 'faqWriter' : 'faqContent';

    const router = useRouter();

    const { data, isLoading, error, refetch } = useQuery(
        ['faqAdminVersionList', { searchField: searchParams.searchField, searchInput: searchParams.searchInput, page, size }],
        () => getFaqAdminVersionList({ searchField: searchParams.searchField, searchInput: searchParams.searchInput, page: page - 1, size }),
        {
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (data) {
            console.log('Fetched data:', data);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [page, size, refetch]);

    const deleteFaqAdminVersionMutation = useMutation(deleteFaqAdminVersion, {
        onSuccess: () => {
            queryClient.invalidateQueries('faqAdminVersionList');
        },
        onError: handleAxiosError,
    });

    const executeSearch = () => {
        setPage(1);
        setSearchParams({ searchField, searchInput });
        refetch();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            executeSearch();
        }
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearchChange = (event) => setSearchInput(event.target.value);

    const handleDelete = async (faqNum) => {
        try {
            const response = await axios.delete(`http://localhost:8080/faq/${faqNum}`);
            console.log(`Deleted FAQ with ID: ${faqNum}`, response.data);
            refetch(); // 데이터 다시 가져오기
        } catch (error) {
            console.error(`Error deleting FAQ with ID: ${faqNum}`, error);
        }
    };

    const openModal = (userData = null) => {
        if (userData) {
            setIsEditMode(true);
            setCurrentFAQ(userData);
        } else {
            setIsEditMode(false);
            setCurrentFAQ({});
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = async () => {
        try {
            // 서버로 전송할 데이터를 준비
            let faqData = { ...currentFAQ };
    
            console.log(faqData);

            // 새 카테고리를 입력한 경우, newCategory 값을 faqCategory로 설정
            if (currentFAQ.faqCategory === 'new') {
                faqData.faqCategory = currentFAQ.newCategory;
                
            }else{
                faqData.faqCategory = currentFAQ.faqCategory;
            }
            delete faqData.newCategory; // newCategory 필드는 삭제
    
            console.log('Sending FAQ data:', faqData); // 전송할 데이터 확인
    
            // 서버로 데이터 전송
            const response = await axios.post('http://localhost:8080/faq/faq', faqData);
            console.log('FAQ submitted:', response.data);
            refetch(); // 데이터 다시 가져오기
            closeModal();
        } catch (error) {
            console.error('Error submitting FAQ:', error);
        }
    };
    

    const handleNavigation = (path) => {
        router.push(path);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    // FAQ 목록에서 카테고리 목록 추출
    const categories = [...new Set(data.map(faq => faq.faqCategory))];

    return (
        <div className="max-w-screen-2xl mx-auto p-4">
            <Header />
            <div style={{ display: 'flex', minHeight: '1000px' }}>
                <AdminSidebar />
                <div className={styles.content}>
                    <div className={styles.container}>
                        <h2 className={styles.centeredText}>FAQ(Admin ver.)</h2>
                        <button className={styles.mkbutton} onClick={() => openModal()}>글쓰기</button>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                            <select value={searchType} onChange={handleSearchTypeChange}>
                                <option value="id">아이디</option>
                                <option value="name">내용</option>
                            </select>
                            <input type="text" placeholder="검색..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
                            <button onClick={executeSearch}>검색</button>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: "15vw", textAlign: "center" }}>제목</th>
                                    <th style={{ width: "30vw", textAlign: "center" }}>내용</th>
                                    <th style={{ width: "30vw", textAlign: "center" }}>카테고리</th>
                                    <th style={{ width: "20vw", textAlign: "center" }}>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && Array.isArray(data) ? (
                                    data.map(user => (
                                        <tr key={user.faqNum}>
                                            <td style={{ width: "15vw", textAlign: "center" }}>
                                                <span className={styles.truncatedText}>{user.faqTitle}</span>
                                            </td>
                                            <td style={{ width: "30vw", textAlign: "center" }}>
                                                <span className={styles.truncatedText2}>{user.faqContent}</span>
                                            </td>
                                            <td style={{ width: "30vw", textAlign: "center" }}>
                                                <span className={styles.truncatedText2}>{user.faqCategory}</span>
                                            </td>
                                            <td style={{ width: "20vw", textAlign: "center" }}>
                                                <button className={styles.button} onClick={() => openModal(user)}>수정</button>
                                                <button className={styles.button} onClick={() => handleDelete(user.faqNum)}>삭제</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>No data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>이전</button>
                            <button onClick={() => setPage(prev => prev + 1)} disabled={data.length < size}>다음</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className={modalstyles.modal}
                overlayClassName={modalstyles.overlay}
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
        value={currentFAQ.faqCategory === 'new' ? 'new' : currentFAQ.faqCategory || ''}
        onChange={(e) => setCurrentFAQ({ ...currentFAQ, faqCategory: e.target.value, newCategory: '' })}
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
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, faqCategory: 'new', newCategory: e.target.value })}
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
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                    >
                        취소
                    </button>
                </div>
            </Modal>
        </div>
    );
});

const FaqAdminVersionListPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <FaqAdminVersionListComponent />
        </QueryClientProvider>
    );
};

export default FaqAdminVersionListPage;
