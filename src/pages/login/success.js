import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authStore } from '../../stores/authStore';

const LoginSuccess = () => {
    const router = useRouter();

    useEffect(() => {
        const {
            access,
            refresh,
            isAdmin,
            userId,
            userName,
            nickName,
            profileUrl,
            userType,
            email,
            gender,
            phone,
            birthDate,
            loginType
        } = router.query;

        if (access && refresh) {
            // JWT 토큰과 사용자 정보를 로컬 스토리지에 저장합니다.
            window.localStorage.setItem("token", access);
            window.localStorage.setItem("refresh", refresh);
            window.localStorage.setItem("loginType", loginType);

            if (isAdmin !== undefined && isAdmin !== null) {
                window.localStorage.setItem("isAdmin", JSON.stringify(isAdmin === 'true'));
            }

            if (userId) {
                window.localStorage.setItem("userId", userId);
                authStore.setUserId(userId);
            }

            if (email) {
                window.localStorage.setItem("email", email);
                authStore.setEmail(email);
            }

            if (userName) {
                authStore.setUserName(userName);
            }

            if (nickName) {
                window.localStorage.setItem("nickName", nickName);
                authStore.setNickName(nickName);
            }

            if (profileUrl) {
                window.localStorage.setItem("profileUrl", profileUrl);
                authStore.setProfileUrl(profileUrl);
            }

            if (userType) {
                window.localStorage.setItem("userType", userType);
            } else {
                window.localStorage.setItem("userType", 'U');
            }

            if (gender) {
                window.localStorage.setItem("gender", gender);
                authStore.setGender(gender);
            }

            if (phone) {
                window.localStorage.setItem("phone", phone);
                authStore.setPhone(phone);
            }

            if (birthDate) {
                window.localStorage.setItem("birthDate", birthDate);
                authStore.setBirthDate(birthDate);
            }

            authStore.checkLoggedIn();

            router.push('/user/snsInfo');
        }
    }, [router.query]);

    return (
        <div>
            <p>로그인 성공! 리다이렉트 중...</p>
        </div>
    );
};

export default LoginSuccess;
