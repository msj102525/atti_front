import React, { useEffect, useState } from 'react';
import axios from "@/api/axiosApi";
import Chat from './chatSpace';

const RegularUser = ({ userId, userType }) => {
  const [userSession, setUserSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isCahtDisabled, setIsChatDisabled] = useState(true);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get(`/chat/session/alarm/${userId}`, {
          params: { type: 'sender' }
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
    const sessionMap = sessions.reduce((map, session) => {
      if (!map[session.receiverId] || map[session.receiverId].chatId < session.chatId) {
        map[session.receiverId] = session;
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
        <p className="text-xl font-semibold text-blue-600 bg-blue-100 p-4 rounded-md shadow-md mb-4">
          User ID: {userId} 님 환영합니다.
        </p>
        <p className="text-lg text-gray-700 bg-gray-100 p-4 rounded-md shadow-sm mb-6">
          채팅 내역은 결제 후 24시간 동안 활성화 됩니다.
        </p>
        
        {userSession === null ? (
          <p className="text-center text-gray-500 mt-8 p-4 bg-gray-100 rounded-md">
            활성화된 채팅방이 존재하지 않습니다.
          </p>
        ) : (
          userSession.map((session, index) => (
            session.visible ? (
              <div key={index} className="border-b border-gray-300 p-4">
                <h3 className="text-lg">채팅 상대 : {session.receiverId}</h3>
                <h3 className="text-lg">시간 : {session.limitTime}분</h3>
                <ul>
                  <li>
                    <div className="text-lg">결제 시간 : {formatDate(session.startTime)}</div>
                    <div>
                      <button className="text-blue-500" onClick={() => handleNavigate(session)}>이동</button>
                      <button className="ml-8 text-red-500" onClick={() => handleDismiss(index)}>확인</button>
                    </div>
                  </li>
                </ul>
              </div>
            ) : null
          ))
        )}
      </div>
      
      <div className="w-1/2">
        {showChat && selectedSession && (
          <div className="ml-4">
            <Chat 
              chatId={selectedSession.chatId} 
              senderId={userId} 
              receiverId={selectedSession.receiverId} 
              userType={userType} 
              limitTime={selectedSession.limitTime}
              status={selectedSession.status}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegularUser;
