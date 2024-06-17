import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/admin/AdminSidebar.module.css';

const Sidebar = () => {
    const router = useRouter();
    const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false);
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        router.push(path);
    };

    const toggleMemberMenu = () => {
        setIsMemberMenuOpen(!isMemberMenuOpen);
    };

    const togglePostMenu = () => {
        setIsPostMenuOpen(!isPostMenuOpen);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.menu}>
                <h3>관리자 메뉴</h3>
                <ul>
                    <li onClick={toggleMemberMenu}>▼ 회원 관리</li>
                    {isMemberMenuOpen && (
                        <ul>
                            <li onClick={() => handleNavigation('/admin/memberList')}>회원 리스트</li>
                            <li onClick={() => handleNavigation('/admin/suspendedMembers')}>정지 회원</li>
                        </ul>
                    )}
                    <li onClick={togglePostMenu}>▼ 게시글 관리</li>
                    {isPostMenuOpen && (
                        <ul>
                            <li onClick={() => handleNavigation('/admin/communityPosts')}>커뮤니티</li>
                            <li onClick={() => handleNavigation('/admin/announcements')}>공지사항</li>
                            <li onClick={() => handleNavigation('/admin/faqs')}>FAQ</li>
                            <li onClick={() => handleNavigation('/admin/inquiries')}>문의하기</li>
                            <li onClick={() => handleNavigation('/admin/todayLine')}>오늘 한 줄</li>
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;