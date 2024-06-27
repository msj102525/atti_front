import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from "../../styles/inquiry/inquiryUpdate.module.css";
import Header from '../common/Header';
import { getInquiryDetail, updateInquiry, deleteInquiry } from '@/api/inquiry/inquiry';

const InquiryUpdate = () => {
    const router = useRouter();
    const { inquiryNo } = router.query;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (inquiryNo) {
            const fetchInquiryDetail = async () => {
                try {
                    const inquiry = await getInquiryDetail(inquiryNo);
                    setTitle(inquiry.title);
                    setContent(inquiry.content);
                } catch (error) {
                    console.error("There was an error fetching the inquiry detail!", error);
                }
            };

            fetchInquiryDetail();
        }
    }, [inquiryNo]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateInquiry(inquiryNo, { title, content });
            router.push(`/inquiry/inquiryDetail?inquiryNo=${inquiryNo}`);
        } catch (error) {
            console.error("There was an error updating the inquiry!", error);
        }
    };

    const handleDelete = async () => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            try {
                await deleteInquiry(inquiryNo);
                router.push('/inquiry');
            } catch (error) {
                console.error("There was an error deleting the inquiry!", error);
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="main-container" style={{ paddingTop: '100px' }}>
                <div className={styles.container}>
                    <hr />
                    <form id="modifyForm" onSubmit={handleSubmit}>
                        <input
                            className={styles.titleInput}
                            type="text"
                            name="title"
                            maxLength="44"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <hr />
                        <textarea
                            className={styles.contentbox}
                            name="content"
                            rows="20"
                            cols="20"
                            maxLength="254"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <hr />
                        <input type="hidden" name="page" value="1" />
                        <input type="hidden" name="inquiryNo" value={inquiryNo} />
                        <br />
                        <div className={styles.btnGroup}>
                            <button type="submit" className={styles.mv}>수정하기</button>
                            <button type="button" onClick={() => router.push('/inquiry')} className={styles.mv}>돌아가기</button>
                            <button type="button" onClick={handleDelete} className={styles.delete}>삭제하기</button>
                        </div>
                    </form>
                </div>
            </div>
            <br />
            <hr />
        </div>
    );
};

export default InquiryUpdate;
