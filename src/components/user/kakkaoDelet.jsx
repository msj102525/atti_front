import React from 'react';
import axios from '../../api/axiosApi';
import { logoutKakao } from '@/api/user/user';

const KakaoUnlink = () => {
  const handleUnlink = async () => {
    const accessToken = localStorage.getItem('token'); 

    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await axios.post(
        'https://kapi.kakao.com/v1/user/unlink',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }
      );

      console.log('연결 끊기 성공:', response.data);
      
      // 카카오 로그아웃 처리
      await logoutKakao();

      // 로그아웃 후 로컬 스토리지 초기화 및 리다이렉트
      window.localStorage.clear();
      window.location.href = "/"; // 홈 페이지로 리다이렉트
    } catch (error) {
      console.error('연결 끊기 실패:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <button onClick={handleUnlink}>카카오 계정 연결 끊기</button>
    </div>
  );
};

export default KakaoUnlink;
