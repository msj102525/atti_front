import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserComponent = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>사용자 정보</h1>
            <p>아이디: {user.userId}</p>
            <p>이름: {user.userName}</p>
            <p>이메일: {user.email}</p>
            <p>닉네임: {user.nickName}</p>
            <p>전화번호: {user.phone}</p>
            <p>생일: {user.birthDate}</p>
            {/* <p>성별: {user.gender}</p> */}
            <p>프로필 URL: {user.profileUrl}</p>
            <p>로그인 타입: {user.loginType}</p>
        </div>
    );
};

export default UserComponent;
