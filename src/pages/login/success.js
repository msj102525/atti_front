import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authStore } from '../stores/authStore';
const LoginSuccess = () => {
    const router = useRouter();

    useEffect(() => {
        const { access, refresh, isAdmin, userId, userName, nickName, profileUrl, userType } = router.query;

        if (access && refresh) {
            // JWT 토큰과 사용자 정보를 로컬 스토리지에 저장합니다.
            window.localStorage.setItem("token", access);
            window.localStorage.setItem("isAdmin", JSON.stringify(isAdmin === 'true'));
            window.localStorage.setItem("refresh", refresh);
            window.localStorage.setItem("userId", userId || '');
            window.localStorage.setItem("userName", userName || '');
            //window.localStorage.setItem("nickName", nickName || '');
            // window.localStorage.setItem("profileUrl", profileUrl || '');
            //window.localStorage.setItem("userType", userType || 'U');
            authStore.checkLoggedIn();
            
        
            // 원하는 페이지로 리다이렉트합니다.
            router.push('/');
        }
    }, [router.query]);

    return (
        <div>
            <p>로그인 성공! 리다이렉트 중...</p>
        </div>
    );
};

export default LoginSuccess;
