import React, { useEffect, useState } from 'react';
import axios from "@/api/axiosApi";
import Chat from './chatSpace';

const RegularUser = ({ userId, userType }) => {
  const [userSession, setUserSession] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get(`/chat/session/alarm/${userId}`, {
          params: { type: 'receiver' }
        });
        const sessions = response.data;
        console.log(sessions);
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

  const handleNavigate = (session) => {
    setSelectedSession(session);
    setShowChat(true);
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
    <div className="flex justify-between">
      <div>
        <p className="text-lg">User ID: {userId}</p>
        <p className="text-2xl mb-8">회원 유형: {userType}</p>
        
        {userSession.map((session, index) => (
          session.visible ? (
            <div key={index} className="border-b border-gray-300 p-4">
              <h3 className="text-lg">발신인 : {session.senderId}</h3>
              <ul>
                <li>
                  <div className="text-lg">시간 : {formatDate(session.startTime)}</div>
                  <div>
                    <button className="text-blue-500" onClick={() => handleNavigate(session)}>이동</button>
                    <button className="ml-8 text-red-500" onClick={() => handleDismiss(index)}>확인</button>
                  </div>
                </li>
              </ul>
            </div>
          ) : null
        ))}
      </div>
      
      <div className="w-1/2">
        {showChat && selectedSession && (
          <div className="ml-4">
            <Chat 
              chatId={selectedSession.chatId} 
              senderId={selectedSession.receiverId} 
              receiverId={userId}
              userType={userType} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegularUser;
