import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const UserComponent = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                setError('사용자 정보를 가져오는 중 오류가 발생했습니다.');
                console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
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
            <p>성별: {user.gender}</p>
            <p>프로필 URL: {user.profileUrl}</p>
            <p>로그인 타입: {user.loginType}</p>
        </div>
    );
};

UserComponent.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserComponent;
