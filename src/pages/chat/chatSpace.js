import React, { useState, useRef, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import mqtt from 'mqtt';
import axios from 'axios';

const Chat = ({ chatId, senderId, receiverId, userType }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const client = useRef(null);
  const clientId = useRef(`client_${Math.random().toString(16).substr(2, 8)}`);
  const [isLoading, setIsLoading] = useState(true);
  const [payInfo, setPayInfo] = useState([]);

  console.log(chatId, senderId, receiverId, userType);

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
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
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
    if (inputValue.trim()) {
      const timestamp = new Date().toISOString();
      const message = { messageContent: inputValue, senderId, receiverId, clientId: clientId.current, timestamp, chatId };
      client.current.publish(`chat/${receiverId}`, JSON.stringify(message));

      try {
        await axios.post('http://localhost:8080/chat/message', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (error) {
        console.error('Failed to save message:', error);
      }

      setInputValue('');
    }
  };

  const handleEndChat = () => {
    alert('채팅이 종료되었습니다.');
    setMessages([]);
    if (client.current) {
      client.current.end();
    }
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
      <div className="w-full max-w-2xl p-4 bg-gray-50 border rounded-lg shadow-lg flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto space-y-4 p-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.senderId === senderId ? 'justify-end' : 'justify-start'}`}>
              <div className="relative">{message.senderId}
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
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-0 flex flex-col space-y-2 p-2">
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
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
    </div>
  );
};

export default Chat;
