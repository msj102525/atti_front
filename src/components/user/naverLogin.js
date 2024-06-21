import React from 'react';
import Image from 'next/image';
import naverLogin from '../../../public/naverLogin.png';


const NaverLogin = () => {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_API_NAVER_CLIENT_ID; // 환경 변수에서 클라이언트 ID를 가져옵니다.
        const redirectUri = 'http://localhost:8080/auth/naver/callback'; // 리다이렉트 URI
        const encodedRedirectUri = encodeURIComponent(redirectUri); // 리다이렉트 URI를 인코딩합니다.

        window.location.href = `https://nauth.naver.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&through_account=true`;
    };

    return (
        <div className="naver-login">
            <button onClick={handleLogin}>
                <Image src={naverLogin}/>
            </button>
        </div>
    );
};

export default NaverLogin;
