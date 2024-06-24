// components/NaverLogin.js
import React from 'react';
import Image from 'next/image';
import naverLoginImage from '../../../public/naverLogin.png';

const NaverLogin = () => {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_API_NAVER_CLIENT_ID;
        const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/auth/naver/callback`;
        const encodedRedirectUri = encodeURIComponent(redirectUri);

        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&state=STATE_STRING`;
    };

    return (
        <div className="naver-login">
            <button onClick={handleLogin}>
                <Image src={naverLoginImage} alt="Naver Login" />
            </button>
        </div>
    );
};

export default NaverLogin;
