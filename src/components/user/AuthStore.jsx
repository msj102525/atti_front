import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { authStore } from '@/pages/stores/authStore';
import { logout, logoutkakao } from '@/api/user/user';
// import { authStore } from '@/pages/stores/authStore';

const AuthStatus = observer(() => {
  const router = useRouter();

  useEffect(() => {
    authStore.checkLoggedIn();
  }, []);

  const redirectToUserTypePage = () => {
    const userType = authStore.userType;
    if (userType === 'A') {
      router.push('/admin/memberList');
    } else if (userType === 'U') {
      router.push('/');
    } else if (userType === 'D') {
      router.push('/');
    } else {
      router.push('/');
    }
  };

  const handleLoginClick = async () => {
    try {
      if (!authStore.loggedIn && !authStore.socialLoggedIn) {
        router.push('/login'); // 로그인 페이지로 이동
      } else if (authStore.socialLoggedIn) {
        await logoutkakao();
        authStore.setSocialLoggedIn(false); // 소셜 로그아웃 처리
        router.push('/'); 
      } else {
        await logout();
        authStore.setLoggedIn(false); // 일반 로그아웃 처리
        router.push('/'); 
      }
    } catch (error) {

      console.error('로그아웃 실패:', error);
    }
  };

  const handleMyPageClick = () => {
    router.push('/user/mypage'); // mypage 페이지로 이동
  };

  return (
    <div>
      <button onClick={handleLoginClick}>
        {authStore.loggedIn || authStore.socialLoggedIn ? '로그아웃' : '로그인'}
      </button>
      <br/>
      {(authStore.loggedIn || authStore.socialLoggedIn) && (
        <button onClick={handleMyPageClick}>
          MyPage
        </button>
      )}
    </div>
  );
});


export const sendTempPassword = (data) => {
  return axios.post("/send-temp-password", data).then((res) => res);
};

export const verifyTempPassword = (data) => {
  return axios.post("/verify-temp-password", data).then((res) => res);
};


export default AuthStatus;
