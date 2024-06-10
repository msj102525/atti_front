// pages/memberList/index.js

import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import MemberCard from "../../components/admin/MemberCard"; // MemberCard 컴포넌트 가져오기

const MemberListPage = observer(() => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 데이터를 가져오는 API 요청을 진행합니다.
                const response = await fetch('여기에_데이터를_가져오는_API_URL');
                if (!response.ok) {
                    throw new Error('데이터를 불러오는데 문제가 발생했습니다.');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setIsLoading(false);
            } catch (error) {
                console.error('데이터를 가져오는 중 에러가 발생했습니다:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <div className="container mt-5">
            <h2>회원 리스트</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "5vw", textAlign: "center" }}>회원아이디</th>
                        <th style={{ textAlign: "center" }}>회원이름</th>
                        <th style={{ width: "10vw", textAlign: "center" }}>닉네임</th>
                        <th style={{ width: "7vw", textAlign: "center" }}>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {data.members.map(member => (
                        <MemberCard key={member.id} user={member} />
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default MemberListPage;