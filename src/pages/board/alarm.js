import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import RegularUser from './auser';
import DoctorUser from './adoctor';

const UserProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // 로컬 스토리지에서 유저 정보 가져오기
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    const storedUserType = localStorage.getItem('userType');
    setUserId(storedUserId);
    setUserName(storedUserName);
    setUserType(storedUserType);
    setIsLoading(false); // 로딩 상태 업데이트
  }, []);

  // 로딩 중일 때는 빈 화면을 보여줍니다.
  if (isLoading) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">로그인한 사용자 정보</h1>
      {userId && userType ? (
        userType === 'U' ? (
          <RegularUser userId={userId} userType={userType} />
        ) : (
          <DoctorUser userId={userId} userType={userType} />
        )
      ) : (
        <p className="text-lg">로그인 해주세요</p>
      )}
    </div>
  );
};

export default UserProfilePage;
