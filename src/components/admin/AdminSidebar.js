import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/admin/AdminSidebar.module.css';

const Sidebar = () => {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(null);

    const handleNavigation = (path) => {
        router.push(path);
    };

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className={styles.sidebar }>
            <h3 className={styles.menuTitle}>관리자 메뉴</h3>
            <div className={styles.menu}>
                <ul>
                    <li onClick={() => toggleMenu('member')}>
                        <span>회원 관리</span>
                        <span className={styles.arrow}>{openMenu === 'member' ? '▲' : '▼'}</span>
                    </li>
                        <ul className={`${openMenu === 'member' ? styles.open : ''}`}>
                            <li onClick={() => handleNavigation('/admin/memberList')}>회원 리스트</li>
                            <li onClick={() => handleNavigation('/admin/suspensionMemberList')}>정지 회원</li>
                        </ul>
                    <li onClick={() => toggleMenu('post')}>
                        <span>게시글 관리</span>
                        <span className={styles.arrow}>{openMenu === 'post' ? '▲' : '▼'}</span>
                    </li>
                        <ul className={`${openMenu === 'post' ? styles.open : ''}`}>
                            <li onClick={() => handleNavigation('/admin/communityAdminVersion')}>커뮤니티</li>
                            <li onClick={() => handleNavigation('/admin/noticeAdminVersion')}>공지사항</li>
                            <li onClick={() => handleNavigation('/admin/faqAdminVersion')}>FAQ</li>
                            <li onClick={() => handleNavigation('/admin/inquiryAdminVersion')}>문의하기</li>
                            <li onClick={() => handleNavigation('/admin/todayLine')}>오늘 한 줄</li>
                        </ul>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;