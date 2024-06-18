import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../common/Header';
import Footer from '../common/Footer';

const SuccessPage = () => {
  const router = useRouter();
  const { paymentKey, orderId, amount } = router.query;
  const [timeLeft, setTimeLeft] = useState(3);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    // localStorage에서 selectedTime 가져오기
    const storedSelectedTime = localStorage.getItem("selectedTime");
    setSelectedTime(storedSelectedTime);

    if (!paymentKey || !orderId || !amount) {
      return;
    }

    async function confirmPayment() {
      const requestData = {
        paymentKey,
        orderId,
        amount,
        selectedTime: storedSelectedTime
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

        if (!response.ok || json === 0) {
          router.push(`/pay/fail?message=${json.message || '결제 실패'}&code=${json.code || 'ERROR'}`);
        } else {
          // 결제 성공 비즈니스 로직을 구현하세요.
          console.log(json);
          await savePayment(orderId, amount); // 결제 정보 저장 로직 추가
          setTimeout(() => {
            router.push('/chat/chat');
          }, 3000);
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
        router.push(`/pay/fail?message=${error.message}&code=${error.code || 'ERROR'}`);
      }
    }

    confirmPayment();
  }, [paymentKey, orderId, amount]);

  const savePayment = async (orderId, amount) => {
    const paymentData = {
      payNum: orderId,
      userId: 'userid01', // 예시 사용자 아이디
      payAmount: amount,
      payMethod: '토스',
      payDate: new Date().toISOString()
    };
  
    try {
      const response = await fetch('http://localhost:8080/pay/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
  
      const json = await response.json();
      if (response.ok && json === 1) {
        console.log('Payment saved successfully');
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
      router.push('/chat/chat');
    }
  }, [timeLeft, router]);

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
