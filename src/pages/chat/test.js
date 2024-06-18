import React, { useState, useRef, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import mqtt from 'mqtt';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const client = useRef(null);
  const clientId = useRef(`client_${Math.random().toString(16).substr(2, 8)}`);

  useEffect(() => {
    // MQTT 클라이언트 초기화 및 연결
    client.current = mqtt.connect('ws://broker.hivemq.com:8000/mqtt', { clientId: clientId.current });

    client.current.on('connect', () => {
      console.log('MQTT connected');
      client.current.subscribe('chat/topic', (err) => {
        if (!err) {
          console.log('Subscribed to chat/topic');
        }
      });
    });

    client.current.on('message', (topic, message) => {
      const receivedMessage = JSON.parse(message.toString());
      if (receivedMessage.clientId !== clientId.current) {
        setMessages((prevMessages) => [...prevMessages, { text: receivedMessage.text, sender: 'B' }]);
      }
    });

    return () => {
      if (client.current) {
        client.current.end();
      }
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      const message = { text: inputValue, sender: 'A', clientId: clientId.current };
      client.current.publish('chat/topic', JSON.stringify(message));
      setMessages([...messages, message]);
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

  return (
    <div className="h-screen flex flex-col items-center bg-white p-4 pr-6">
      <div className="w-full max-w-2xl p-4 bg-gray-50 border rounded-lg shadow-lg flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto space-y-4 p-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'A' ? 'justify-end' : 'justify-start'}`}>
              <div className="bg-white text-black p-3 rounded-lg max-w-xs shadow-lg">
                {message.text}
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

export default ChatApp;
