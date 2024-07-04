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
  const [lt, setLt] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  console.log(chatId, senderId, receiverId, userType, limitTime, status);

  useEffect(() => {
    // status 값에 따라 isDisabled 상태 설정
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
      console.log(response.data, 'chat messages123');
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

  useEffect(() => {
    const fetchChatSession = async () => {
      try {
        const response = await axios.get(`/chat/time/${chatId}`);
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
      const response = await axios.get(`/pay/recent`, {
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

  const earliestMessage = messages.reduce((earliest, current) => {
    return new Date(current.timestamp) < new Date(earliest.timestamp) ? current : earliest;
  }, messages[0]);

  const sendMessage = async () => {
    if (!inputValue.trim()) {
        setErrorMessage('메시지를 입력하세요');
        return;
    }

    // Check if there are any existing messages
    if (messages.length === 0) {
        // Save the first message without time check
        console.log(messages.length, '메시지 길이');
        await saveMessage();
    } else {
        // For subsequent messages, check time limit
        console.log(messages, 'zxc');
        const firstMessageTime = new Date(earliestMessage.timestamp);
        console.log(firstMessageTime, '첫시간');
        const currentTime = new Date();
        firstMessageTime.setMinutes(firstMessageTime.getMinutes() + limitTime);

        console.log(currentTime.toString(), '지금시간');
        console.log(firstMessageTime.toString(), '제한 시간');

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
    
    console.log(message, '메시지 정보');

    client.current.publish(`chat/${receiverId}`, JSON.stringify(message));

    try {
      await axios.post('/chat/message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
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
      // 서버에 종료 요청을 보냄
      await axios.post(`/chat/end/${chatId}`);
      
      // 로컬 스토리지 업데이트
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
    // 리뷰 제출 로직 추가
    console.log('Rating:', rating);
    console.log('Review:', review);
  
    const date = new Date();
    const writeDate = date.toISOString().split('T')[0];
  
    console.log(writeDate);
    console.log(typeof(writeDate));
    console.log(senderId);
    console.log(receiverId);
  
    // 서버로 보낼 데이터 객체 생성
    const reviewData = {
      rating,
      review,
      writeDate,
      senderId,
      receiverId
    };
  
    try {
      // POST 요청으로 데이터 전송
      // 먼저 GET 요청을 보내서 기존 리뷰를 확인합니다.
    const checkResponse = await axios.get('/review/check', {
      params: {
        writeDate,
        senderId,
        receiverId
      }
    });

    if (checkResponse.data.length > 0) {
      // 조건에 맞는 리뷰가 이미 있는 경우
      console.log('You have already submitted a review for this session today.');
      alert('한 의사에 대해서 하루에 하나만 리뷰 작성이 가능합니다.');
      return; // 리뷰 작성 중단
    }


      const response = await axios.post(`/review`, reviewData);
  
      if (response.status === 200) {
        console.log('Review submitted successfully:', response.data);
        // 추가적으로 성공 시 수행할 로직이 있다면 여기에 추가
      } else {
        console.error('Failed to submit review:', response.status);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  
    setIsReviewModalOpen(false); // 모달 창 닫기
    resetReviewState()
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
                  setIsReviewModalOpen(false)
                  resetReviewState(); // 상태 초기화
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
