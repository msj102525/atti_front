import React from 'react';

const RegularUser = ({ userId, userName }) => {
  return (
    <div>
      <p className="text-lg">User ID: {userId}</p>
      <p className="text-lg">User Name: {userName}</p>
      <p className="text-lg">일반 유저 입니다.</p>
    </div>
  );
};

export default RegularUser;
