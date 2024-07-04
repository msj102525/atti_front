import React from 'react';
import styles from '@/styles/signUp/normalSignUp.module.css';

const NaverSignup = () => {
    const handleSignup = () => {
        const clientId = process.env.NEXT_PUBLIC_API_NAVER_CLIENT_ID; // 환경 변수에서 클라이언트 ID를 가져옵니다.
        const redirectUri = process.env.NEXT_PUBLIC_API_URL + '/auth/naver/signup/callback'; // 리다이렉트 URI
        const encodedRedirectUri = encodeURIComponent(redirectUri); // 리다이렉트 URI를 인코딩합니다.

        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&state=STATE_STRING`;
    };

    return (
        <div>
            <button className={styles.naverSignUp} onClick={handleSignup}>네이버 회원가입</button>
        </div>
    );
};

export default NaverSignup;
