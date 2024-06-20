import React, { useState, useRef, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import mqtt from 'mqtt';
import axios from 'axios';

const Chat = ({ chatId, userType }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const client = useRef(null);
  const clientId = useRef(`client_${Math.random().toString(16).substr(2, 8)}`);
  const [sendId, setSendId] = useState(null);
  const [getId, setGetId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchChatSession = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8080/chat/session/${userId}`, {
          params: { type: userType === 'U' ? 'sender' : 'receiver' }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching chat session:', error);
        return null;
      }
    };

    if (typeof window !== 'undefined') {
      const storedSendId = localStorage.getItem('userId');
      setSendId(storedSendId);

      fetchChatSession(storedSendId).then((chatSession) => {
        if (chatSession) {
          const receiverId = userType === 'U' ? chatSession.receiverId : chatSession.senderId;
          setGetId(receiverId);
          setIsLoading(false);

          fetchMessages(chatSession.chatId);
        }
      });

      console.log(storedSendId, '보내기');
      console.log(getId, '받기');
    }
  }, [chatId, userType]);

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/messages/${chatId}`);
      console.log('Fetched Messages:', response.data);
      

      setMessages(response.data);
      console.log(response.data, 'Fetched Messages');
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (!isLoading && sendId) {
      client.current = mqtt.connect('ws://broker.hivemq.com:8000/mqtt', { clientId: clientId.current });

      client.current.on('connect', () => {
        console.log('MQTT connected');
        client.current.subscribe(`chat/${sendId}`, (err) => {
          if (!err) {
            console.log(`Subscribed to chat/${sendId}`);
          }
        });
      });

      client.current.on('message', (topic, message) => {
        const receivedMessage = JSON.parse(message.toString());
        if (receivedMessage.clientId !== clientId.current) {
          const newMessage = { messageContent: receivedMessage.messageContent, sender: receivedMessage.sender, timestamp: receivedMessage.timestamp };
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            return updatedMessages;
          });
        }
      });

      return () => {
        if (client.current) {
          client.current.end();
        }
      };
    }
  }, [isLoading, sendId, getId]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim()) {
      const timestamp = new Date().toISOString();
      const sendId = localStorage.getItem('userId');

      

      const message = { messageContent: inputValue, senderId: sendId, clientId: clientId.current, timestamp: timestamp, chatId: chatId };
      // 대상 사용자 ID의 채널에 메시지를 발행
      client.current.publish(`chat/${getId}`, JSON.stringify(message));

      console.log(message);

      try {
        const response = await axios.post('http://localhost:8080/chat/message', message);
          
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          return updatedMessages;
        });

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <div key={index} className={`flex ${message.senderId === sendId ? 'justify-end' : 'justify-start'}`}>
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
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-0 flex flex-col space-y-2 p-2">
              <button
                onClick={sendMessage}
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
