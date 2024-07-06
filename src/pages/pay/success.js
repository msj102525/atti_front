import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../common/Header';
import Footer from '../common/Footer';
import axios from "@/api/axiosApi"; // axios 인스턴스 사용

const SuccessPage = () => {
  const router = useRouter();
  const { paymentKey, orderId, amount } = router.query;
  const [timeLeft, setTimeLeft] = useState(3);
  const [selectedTime, setSelectedTime] = useState(null); // 초기 상태를 null로 설정
  const [userId, setUserId] = useState(null);
  const [getId, setGetId] = useState(null);
  const [method, setMethod] = useState(null);

  useEffect(() => {
    // 클라이언트 측에서만 실행
    if (typeof window !== 'undefined') {
      // localStorage에서 selectedTime 가져오기
      const storedSelectedTime = localStorage.getItem("selectedTime");
      setSelectedTime(storedSelectedTime);

      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);

      const consultDoctorId = localStorage.getItem("consultDoctorId");
      setGetId(consultDoctorId);
    }
  }, []);

  useEffect(() => {
    if (!paymentKey || !orderId || !amount || selectedTime === null) {
      return;
    }

    async function confirmPayment() {
      const requestData = {
        paymentKey,
        orderId,
        amount,
        selectedTime
      };

      try {
        const response = await fetch('/api/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const json = await response.json();

        
        console.log(json, '결제 성공 메소드!!!!!!!!!!!!!');

        if (!response.ok || json === 0) {
          router.push(`/pay/fail?message=${json.message || '결제 실패'}&code=${json.code || 'ERROR'}`);
        } else {
          // 결제 성공 비즈니스 로직을 구현하세요.
          console.log(json);
          setMethod(json.method);
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
        router.push(`/pay/fail?message=${error.message}&code=${error.code || 'ERROR'}`);
      }
    }

    confirmPayment();
  }, [paymentKey, orderId, amount, selectedTime]);

  useEffect(() => {
    if (method !== null) {
      async function handleSavePayment() {
        await savePayment(orderId, amount, method);
        setTimeout(() => {
          router.push('/chat/chatList');
        }, 3000);
      }

      handleSavePayment();
    }
  }, [method, orderId, amount]);

  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul'
  };

  const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(now);
  const formattedDateWithMilliseconds = formattedDate.replace(/\. /g, '-').replace(/ /g, 'T');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

  const savePayment = async (orderId, amount, method) => {
    const paymentData = {
      payNum: orderId,
      userId: userId,
      payAmount: amount,
      payMethod: method,
      payDate: `${formattedDateWithMilliseconds}.${milliseconds}`,
      toDoctor: localStorage.getItem('consultDoctorId'),
    };

    try {
      const response = await axios.post('/pay/save', paymentData);

      const json = response.data;
      if (response.status === 200 && json === 1) {
        console.log('Payment saved successfully');

        // 결제 성공 시 chat_sessions 테이블에 데이터 추가
        const storedUserId = localStorage.getItem("userId");
        const consultDoctorId = localStorage.getItem("consultDoctorId");
        const status = 'true';
        const limitTime = amount == 110000 ? 60 : amount === 55000 ? 30 : null;

        const chatSessionData = {
          senderId: storedUserId,
          receiverId: consultDoctorId,
          limitTime: limitTime,
          startTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          status: status
        };

        console.log(chatSessionData);

        const chatResponse = await axios.post('/chat/session', chatSessionData);

        if (chatResponse.status === 200) {
          const chatSession = chatResponse.data;
          const chatId = chatSession.chatId;
          console.log('Chat session created successfully with chatId:', chatId);

          // Save the chatId in localStorage or state for future use
          localStorage.setItem('currentChatId', chatId);
        } else {
          console.error('Failed to create chat session');
        }
      } else {
        console.error('Failed to save payment');
      }
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/chat/chatList');
    }
  }, [timeLeft, router]);

  // selectedTime이 설정될 때까지 아무것도 렌더링하지 않음
  if (selectedTime === null) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h2 className="text-4xl font-bold text-green-600 mb-6">결제 성공!</h2>
        <div className="bg-green-50 shadow-lg rounded-lg p-8 w-full max-w-md border border-green-300">
          <p className="text-xl font-medium text-gray-700 mb-2">주문번호: <span className="font-semibold">{orderId}</span></p>
          <p className="text-xl font-medium text-gray-700 mb-2">결제 금액: <span className="font-semibold">{amount} 원</span></p>
          <p className="text-xl font-medium text-gray-700">결제키: <span className="font-semibold">{paymentKey}</span></p>
          <p className="text-xl font-medium text-gray-700">결제 상품: <span className="font-semibold">{selectedTime} 채팅 이용권</span></p>
        </div>
        <p className="mt-6 text-lg text-gray-600">
          {timeLeft}초 후에 채팅 페이지로 이동합니다...
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
