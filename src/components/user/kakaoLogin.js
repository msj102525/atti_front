import React from 'react';
import Image from 'next/image';
import kakaoLoginImage from '../../../public/kakao_login.png';

const KakaoLogin = () => {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_API_KAKAO_CLIENT_ID; // 환경 변수에서 클라이언트 ID를 가져옵니다.
        const redirectUri = process.env.NEXT_PUBLIC_API_URL + '/auth/kakao/callback'; // 리다이렉트 URI
        const encodedRedirectUri = encodeURIComponent(redirectUri); // 리다이렉트 URI를 인코딩합니다.

        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&through_account=true`;
    };

    return (
        <div className="kakao-login">
            <button onClick={handleLogin}>
                <Image src={kakaoLoginImage}/>
            </button>
        </div>
    );
};

export default KakaoLogin;
