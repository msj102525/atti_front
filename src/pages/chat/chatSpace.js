import React, { useState, useRef, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import mqtt from 'mqtt';
import axios from "@/api/axiosApi";
import { FaStar } from 'react-icons/fa';

const Chat = ({ chatId, senderId, receiverId, userType, limitTime, status }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const client = useRef(null);
  const clientId = useRef(`client_${Math.random().toString(16).substr(2, 8)}`);
  const [isLoading, setIsLoading] = useState(true);
  const [payInfo, setPayInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const [isDisabled, setIsDisabled] = useState(status === false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    setIsDisabled(status === false);
  }, [status]);

  useEffect(() => {
    const fetchChatSession = async () => {
      try {
        const response = await axios.get(`/chat/session/${senderId}`, {
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
      const response = await axios.get('/chat/messages', {
        params: { chatId, senderId }
      });
      setMessages(response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
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
          const newMessage = {
            messageContent: receivedMessage.messageContent,
            senderId: receivedMessage.senderId,
            timestamp: receivedMessage.timestamp
          };
          setMessages((prevMessages) => {
            // 중복 메시지 필터링
            const messageExists = prevMessages.some((msg) => msg.timestamp === newMessage.timestamp);
            if (!messageExists) {
              const updatedMessages = [...prevMessages, newMessage];
              return updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            }
            return prevMessages;
          });
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
    const fetchChatSession = async () => {
      try {
        const response = await axios.get(`/chat/time/${chatId}`);
        setChatSession(response.data);
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
      const response = await axios.get(`/pay/recent`, {
        params: { userId: senderId }
      });
  
      const filteredPayInfo = response.data
        .filter(payment => payment.toDoctor !== null)
        .reduce((acc, current) => {
          const existingPayment = acc.find(item => item.toDoctor === current.toDoctor);
          if (!existingPayment || new Date(current.payDate) > new Date(existingPayment.payDate)) {
            return acc.filter(item => item.toDoctor !== current.toDoctor).concat([current]);
          } else {
            return acc;
          }
        }, []);
  
      setPayInfo(filteredPayInfo);
      return filteredPayInfo;
    } catch (error) {
      console.error('Error fetching user pay time:', error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    const payTimeData = await fetchUserPayTime();
    sendMessage();
  };

  const earliestMessage = messages.reduce((earliest, current) => {
    return new Date(current.timestamp) < new Date(earliest.timestamp) ? current : earliest;
  }, messages[0]);

  const sendMessage = async () => {
    if (!inputValue.trim()) {
      setErrorMessage('메시지를 입력하세요');
      return;
    }

    if (messages.length === 0) {
      await saveMessage();
    } else {
      const firstMessageTime = new Date(earliestMessage.timestamp);
      const currentTime = new Date();
      firstMessageTime.setMinutes(firstMessageTime.getMinutes() + limitTime);

      if (currentTime > firstMessageTime) {
        try {
          await axios.post(`/chat/end/${chatId}`);
          setIsDisabled(true);
        } catch (error) {
          console.error('Failed to update chat status:', error);
        }
        return;
      }

      await saveMessage();
    }
  };

  const saveMessage = async () => {
    const timestamp = new Date().toISOString();
    const message = { messageContent: inputValue, senderId, timestamp, chatId };
    
    client.current.publish(`chat/${receiverId}`, JSON.stringify(message));

    try {
      await axios.post('/chat/message', message);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        return updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      });
      setInputValue('');
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const handleEndChat = () => {
    setIsModalOpen(true);
  };

  const handleConfirmEndChat = async () => {
    try {
      await axios.post(`/chat/end/${chatId}`);
      setIsDisabled(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to end chat session:', error);
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

  const resetReviewState = () => {
    setRating(0);
    setReview('');
  };

  const handleSubmit = async () => {
    const date = new Date();
    const writeDate = date.toISOString().split('T')[0];

    const reviewData = {
      rating,
      review,
      writeDate,
      senderId,
      receiverId
    };
  
    try {
      const checkResponse = await axios.get('/review/check', {
        params: { writeDate, senderId, receiverId }
      });

      if (checkResponse.data.length > 0) {
        alert('한 의사에 대해서 하루에 하나만 리뷰 작성이 가능합니다.');
        return;
      }

      const response = await axios.post(`/review`, reviewData);
  
      if (response.status === 200) {
        console.log('Review submitted successfully:', response.data);
      } else {
        console.error('Failed to submit review:', response.status);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  
    setIsReviewModalOpen(false);
    resetReviewState();
  };

  return (
    <div className="h-screen flex flex-col items-center bg-white p-4 pr-6">
      {isDisabled && (
        <div className="w-full flex justify-center items-center max-w-2xl p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg flex flex-col text-center mb-4">
          비활성화된 채팅방입니다. 메시지를 입력하실 수 없습니다.
          <button
            onClick={() => setIsReviewModalOpen(true)}
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
              disabled={isDisabled}
            />
            <div className="absolute right-0 flex flex-col space-y-2 p-2">
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
                disabled={isDisabled}
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
      {isReviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">상담은 어떠셨나요? 후기를 남겨주세요</p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">별점</label>
              <div className="flex justify-center">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <FaStar
                      key={starValue}
                      size={30}
                      className="cursor-pointer"
                      color={starValue <= rating ? '#ffc107' : '#e4e5e9'}
                      onClick={() => setRating(starValue)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">리뷰</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                확인
              </button>
              <button
                onClick={() => {
                  setIsReviewModalOpen(false);
                  resetReviewState();
                }}
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
