import React, { useState, useRef, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import mqtt from 'mqtt';
import axios from 'axios';

const Chat = ({ chatId, senderId, receiverId, userType, limitTime }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const client = useRef(null);
  const clientId = useRef(`client_${Math.random().toString(16).substr(2, 8)}`);
  const [isLoading, setIsLoading] = useState(true);
  const [payInfo, setPayInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lt, setLt] = useState('');

  console.log(chatId, senderId, receiverId, userType, limitTime);

  useEffect(() => {
    const fetchChatSession = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/chat/session/${senderId}`, {
          params: { type: userType === 'U' ? 'sender' : 'receiver' }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching chat session:', error);
        return null;
      }
    };

    const initializeChat = async () => {
      const chatSession = await fetchChatSession();
      if (chatSession) {
        setIsLoading(false);
        fetchMessages(chatId);
      }
    };

    if (typeof window !== 'undefined') {
      initializeChat();
    }
  }, [chatId, userType]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/chat/messages', {
        params: { chatId, senderId }
      });
      console.log(response.data, 'chat messages123');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    const disabledStatus = localStorage.getItem(`chat_${chatId}_isDisabled`);
    if (disabledStatus === 'true') {
      setIsDisabled(true);
    }
  }, [chatId]);

  useEffect(() => {
    if (!isLoading) {
      client.current = mqtt.connect('ws://broker.hivemq.com:8000/mqtt', { clientId: clientId.current });

      client.current.on('connect', () => {
        client.current.subscribe(`chat/${senderId}`, (err) => {
          if (!err) {
            console.log(`Subscribed to chat/${senderId}`);
          }
        });
      });

      client.current.on('message', (topic, message) => {
        const receivedMessage = JSON.parse(message.toString());
        if (receivedMessage.clientId !== clientId.current) {
          const newMessage = { messageContent: receivedMessage.messageContent, senderId: receivedMessage.senderId, timestamp: receivedMessage.timestamp };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      return () => {
        if (client.current) {
          client.current.end();
        }
      };
    }
  }, [isLoading, senderId, receiverId]);

  useEffect(() => {
    // Fetch chat session information when the component mounts
    const fetchChatSession = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/chat/time/${chatId}`);
        setChatSession(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch chat session:', error);
      }
    };

    fetchChatSession();
  }, [chatId]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setErrorMessage(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const fetchUserPayTime = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/pay/recent`, {
        params: { userId: senderId }
      });
      console.log(response.data);  // 요청 결과를 로그에 출력
  
      const filteredPayInfo = response.data
        .filter(payment => payment.toDoctor !== null)  // toDoctor가 null이 아닌 항목만 필터링
        .reduce((acc, current) => {
          const existingPayment = acc.find(item => item.toDoctor === current.toDoctor);
          if (!existingPayment || new Date(current.payDate) > new Date(existingPayment.payDate)) {
            return acc.filter(item => item.toDoctor !== current.toDoctor).concat([current]);
          } else {
            return acc;
          }
        }, []);
  
      setPayInfo(filteredPayInfo);
      return filteredPayInfo;  // 결과를 반환
    } catch (error) {
      console.error('Error fetching user pay time:', error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    const payTimeData = await fetchUserPayTime();
    console.log(payTimeData); // Optional: fetched pay time data log for verification
    console.log(payTimeData[0]); 
    console.log(payTimeData[1]); 
    sendMessage();
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) {
      setErrorMessage('메시지를 입력하세요');
      return;
    }

    // Check if there are any existing messages
    if (messages.length === 0) {
      // Save the first message without time check
      console.log(messages.length, '메시지 길이')
      await saveMessage();
    } else {
      // For subsequent messages, check time limit
      const firstMessageTime = new Date(messages[0].timestamp);
      const currentTime = new Date();
      firstMessageTime.setMinutes(firstMessageTime.getMinutes() + limitTime);

      console.log(currentTime.toString(), '지금시간')
      console.log(firstMessageTime.toString(), '제한 시간')

      if (currentTime > firstMessageTime) {
        setIsDisabled(true);
        localStorage.setItem(`chat_${chatId}_isDisabled`, 'true');
        return;
      }

      await saveMessage();
    }
  };

  const saveMessage = async () => {
    const timestamp = new Date().toISOString();
    const message = { messageContent: inputValue, senderId, timestamp, chatId };
    
    console.log(message, '메시지 정보');

    client.current.publish(`chat/${receiverId}`, JSON.stringify(message));

    try {
      await axios.post('http://localhost:8080/chat/message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputValue('');
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const handleEndChat = () => {
    setIsModalOpen(true);
  };

  const handleConfirmEndChat = () => {
    localStorage.setItem(`chat_${chatId}_isDisabled`, 'true');
    setIsDisabled(true);
    setIsModalOpen(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? '오전' : '오후';
    return `${period} ${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  return (
    <div className="h-screen flex flex-col items-center bg-white p-4 pr-6">
    {isDisabled && (
      <div className="w-full flex justify-center items-center max-w-2xl p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg flex flex-col text-center mb-4">
        비활성화된 채팅방입니다. 메시지를 입력하실 수 없습니다.
        <button
          onClick={() => { /* 리뷰 쓰기 버튼 클릭 핸들러 추가 */ }}
          className="w-1/3 mt-4 px-4 py-2 text-black rounded-lg bg-blue-200 hover:bg-blue-200"
        >
        리뷰 쓰기
        </button>
      </div>
      
    )}
  <div className="w-full max-w-2xl p-4 bg-gray-50 border rounded-lg shadow-lg flex flex-col h-[80vh]">
    <div className="flex-1 overflow-y-auto space-y-4 p-2">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.senderId === senderId ? 'justify-end' : 'justify-start'}`}>
          <div className="relative">
            <div className="bg-white text-black p-3 rounded-lg max-w-xs shadow-lg">
              {message.messageContent}
            </div>
            <span className="text-xs text-gray-400 mt-1 block text-right">{formatTimestamp(message.timestamp)}</span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
    <div className="mt-4">
      <div className="relative flex items-center">
        <textarea
          className="w-full h-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder={errorMessage ? '빈 메시지를 전송할 수 없습니다.' : '메시지를 입력하세요...'}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isDisabled} // Disable textarea if chat is disabled
        />
        <div className="absolute right-0 flex flex-col space-y-2 p-2">
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
            disabled={isDisabled} // Disable button if chat is disabled
          >
            전송
          </button>
          <button
            onClick={handleEndChat}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
          >
            종료
          </button>
        </div>
      </div>
    </div>
  </div>
      {/*모달 창 영역*/}
      {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="mb-4">정말로 종료하시겠습니까? 해당 채팅은 비활성화 됩니다.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleConfirmEndChat}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              확인
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
            >
              취소
            </button>
          </div>
        </div>
      </div>
      )}
</div>

  );
};

export default Chat;
