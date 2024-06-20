import React, { useEffect, useState } from 'react';
import Header from '../common/Header';

const UserProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 유저 정보 가져오기
    const storedUserId = localStorage.getItem('userId');
    const storedUserType = localStorage.getItem('userType');
    setUserId(storedUserId);
    setUserType(storedUserType);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">로그인한 사용자 정보</h1>
      {userId && userType ? (
        <div>
          <p className="text-lg">User ID: {userId}</p>
          <p className="text-lg">User Type: {userType}</p>
        </div>
      ) : (
        <p className="text-lg">사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
