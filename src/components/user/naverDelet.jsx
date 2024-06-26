import React from 'react';
import axios from '../../api/axiosApi';
import { logoutNaver } from '@/api/user/user'; // 네이버 로그아웃 함수 가져옴

const NaverUnlink = () => {
  const handleUnlink = async () => {
    const accessToken = localStorage.getItem('token'); // 로컬 스토리지에서 액세스 토큰을 가져옴
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID; // 환경 변수에서 네이버 클라이언트 ID를 가져옴
    const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET; // 환경 변수에서 네이버 클라이언트 시크릿을 가져옴

    if (!accessToken) {
      console.error('No access token found'); // 액세스 토큰이 없을 경우 오류 로그 출력
      return;
    }

    try {
      // 네이버 API로 연결 끊기 요청을 보냄
      const params = new URLSearchParams();
      params.append('grant_type', 'delete');
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('access_token', accessToken);

      const response = await axios.post(
        'https://nid.naver.com/oauth2.0/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }
      );

      console.log('연결 끊기 성공:', response.data);
      
      // 네이버 로그아웃 처리
      await logoutNaver();

      // 로그아웃 후 로컬 스토리지 초기화 및 리다이렉트
      window.localStorage.clear();
      window.location.href = "/"; 
    } catch (error) {
      console.error('연결 끊기 실패:', error.response ? error.response.data : error.message); 
    }
  };

  return (
    <div>
      <button onClick={handleUnlink}>네이버 계정 연결 끊기</button>
    </div>
  );
};

export default NaverUnlink;
