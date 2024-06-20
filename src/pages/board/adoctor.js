import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; 


const RegularUser = ({ userId, userType }) => {
    const [userSession, setUserSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter(); // useRouter 훅 사용

    useEffect(() => {
        const fetchUserSession = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/chat/session/alarm/${userId}`, {
              params: { type: 'receiver' }
            });
            const sessions = response.data;
            const uniqueSessions = processSessions(sessions);
            setUserSession(uniqueSessions.map(session => ({ ...session, visible: true })));
          } catch (error) {
            console.error('Error fetching user session:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchUserSession();
      }, [userId]);


      const processSessions = (sessions) => {
        // 중복된 senderId 제거 및 chatId가 가장 높은 항목 추출
        const sessionMap = sessions.reduce((map, session) => {
          if (!map[session.senderId] || map[session.senderId].chatId < session.chatId) {
            map[session.senderId] = session;
          }
          return map;
        }, {});
        
        return Object.values(sessionMap);
      };

      const handleDismiss = (index) => {
        setUserSession(prevSessions =>
          prevSessions.map((session, i) =>
            i === index ? { ...session, visible: false } : session
          )
        );
      };

      const handleNavigate = (chatId) => {
        router.push(`http://localhost:3000/chat/${chatId}`);
      };

      const formatDate = (dateString) => {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        };
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', options);
      };


    
      if (isLoading) {
        return <p>Loading...</p>;
      }

    return (
        <div>
            <p className="text-lg">User ID: {userId}</p>
            <p className="text-2xl mb-8">회원 유형: {userType}</p>
            
            
            {userSession.map((session, index) => (
                session.visible ? (
                <div key={index} className="border-b border-gray-300 p-4 w-2/3">
                    <h3 className="text-lg">발신인 : {session.senderId}</h3>
                    <ul>
                        <li>
                            <div className="text-lg">시간 : {formatDate(session.startTime)}</div>
                        <div>
                            <button className="text-blue-500" onClick={() => handleNavigate(session.chatId)}>이동</button>
                            <button className="ml-8 text-red-500" onClick={() => handleDismiss(index)}>확인</button>
                        </div>
                        </li>
                    </ul>
                </div>
                ) : null
            ))}
        </div>
    );
};

export default RegularUser;
