import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { authStore } from '@/pages/stores/authStore';
import { logout, logoutkakao, logoutSocial } from '@/api/user/user'; // 소셜 로그아웃 API 추가

const AuthStatus = observer(() => {
  const router = useRouter();

  useEffect(() => {
    authStore.checkLoggedIn();
  }, []);

  const handleLoginClick = async () => {
    if (!authStore.loggedIn && !authStore.socialLoggedIn) {
      router.push('/login'); // 로그인 페이지로 이동
    } else {
      try {
        if (authStore.socialLoggedIn) {
          await logoutSocial(); // 소셜 로그아웃 처리
          authStore.setSocialLoggedIn(false); // 소셜 로그아웃 상태로 변경
        } else {
          await logout(); // 일반 로그아웃 처리
          await logoutkakao();
          authStore.setLoggedIn(false); // 로그아웃 상태로 변경
        }
        router.push('/'); 
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    }
  };

  const handleMyPageClick = () => {
    router.push('/user/mypage'); // mypage 페이지로 이동
  };

  return (
    <div>
      <button onClick={handleLoginClick}>
        {authStore.loggedIn || authStore.socialLoggedIn ? '로그아웃' : '로그인'}
      </button><br/>
      {(authStore.loggedIn || authStore.socialLoggedIn) && (
        <button onClick={handleMyPageClick}>
          MyPage
        </button>
      )}
    </div>
  );
});

export default AuthStatus;
