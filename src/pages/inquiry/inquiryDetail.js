import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Modal from 'react-modal';
import styles from "../../styles/inquiry/inquiryDetail.module.css"; 
import Header from '../common/Header';
import MintButton from "@/components/common/MintButton";
import { getInquiryDetail, deleteInquiry } from '@/api/inquiry/inquiry';

Modal.setAppElement('#__next');

function InquiryDetail() {
    const [inquiry, setInquiry] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();
    const { inquiryNo } = router.query;

    useEffect(() => {
        if (inquiryNo) {
            const fetchInquiryDetail = async () => {
                try {
                    const response = await getInquiryDetail(inquiryNo);
                    setInquiry(response);
                } catch (error) {
                    console.error("There was an error fetching the inquiry detail!", error);
                }
            };

            fetchInquiryDetail();
        }
    }, [inquiryNo]);

    const handleInquiryListClick = () => {
        router.push("/inquiry");
    };

    const handleInquiryUpdateClick = () => {
        router.push(`/inquiry/inquiryUpdate?inquiryNo=${inquiryNo}`);
    };

    const handleDeleteClick = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const confirmDelete = async () => {
        try {
            await deleteInquiry(inquiryNo);
            closeModal();
            router.push("/inquiry");
        } catch (error) {
            console.error("There was an error deleting the inquiry!", error);
            closeModal();
        }
    };

    if (!inquiry) {
        return <div>Loading...</div>;
    }

    // 현재 로그인한 사용자의 userId 가져오기
    const loggedInUserId = localStorage.getItem('userId');

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h3 className={styles.h3}>{inquiry.title}</h3>
                <span>{inquiry.userId}</span>
                <span>조회수 {inquiry.readCount}</span>
                <span>Date: {inquiry.inquiryDate.split("T")[0]}</span>
                <hr />
                <div className={styles.contentbox}>{inquiry.content}</div>
                <hr />
                <div className={styles.btnbox}>
                    <MintButton
                        onClick={handleInquiryListClick}
                        text="목록"
                        sizeW="w-24"
                        sizeH="h-12"
                        fontSize="text-lg"
                        className={styles.list}
                    />
                    {inquiry.userId === loggedInUserId && (
                        <>
                            <MintButton
                                onClick={handleInquiryUpdateClick}
                                text="수정"
                                sizeW="w-24"
                                sizeH="h-12"
                                fontSize="text-lg"
                            />
                            <MintButton
                                onClick={handleDeleteClick}
                                text="삭제"
                                sizeW="w-24"
                                sizeH="h-12"
                                fontSize="text-lg"
                            />
                        </>
                    )}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Confirmation"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>삭제하시겠습니까?</h2>
                <div className={styles.modalButtons}>
                    <MintButton
                        onClick={confirmDelete}
                        text="확인"
                        sizeW="w-30"
                        sizeH="h-12"
                        fontSize="text-lg"
                    />
                    <MintButton
                        onClick={closeModal}
                        text="취소"
                        sizeW="w-30"
                        sizeH="h-12"
                        fontSize="text-lg"
                    />
                </div>
            </Modal>
        </div>
    );
}

export default InquiryDetail;
