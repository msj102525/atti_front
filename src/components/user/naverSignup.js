import React from 'react';

const naverSignup = () => {
    const handleSignup = () => {
        const clientId = process.env.NEXT_PUBLIC_API_NAVER_CLIENT_ID; // 환경 변수에서 클라이언트 ID를 가져옵니다.
        const redirectUri = 'http://localhost:8080/auth/naver/signup/callback'; // 리다이렉트 URI
        const encodedRedirectUri = encodeURIComponent(redirectUri); // 리다이렉트 URI를 인코딩합니다.

        window.location.href = `https://nauth.naver.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&through_account=true`;
    };

    return (
        <div className="naver-SignUp">
            <button onClick={handleSignup}>네이버 회원가입</button>
        </div>
    );
};

export default naverSignup;
