import React, { useState, useEffect } from 'react';
import { termsContent1, termsContent2, termsContent3 } from './payContent';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useRouter } from 'next/router';

const clientKey = 'test_ck_0RnYX2w5322mnvb0yY9g3NeyqApQ';

function App() {
  const [selectedTime, setSelectedTime] = useState("60분");
  const [price, setPrice] = useState(100000);
  const [selectedPayment, setSelectedPayment] = useState('toss');
  const [termsChecked, setTermsChecked] = useState({
    termsCheckbox1: false,
    termsCheckbox2: false,
    termsCheckbox3: false,
  });

  const router = useRouter();

  const handleButtonClick = (time, price) => {
    setSelectedTime(time);
    setPrice(price);
  };

  useEffect(() => {
    handleButtonClick("60분", 100000);
  }, []);

  const handleCheckboxChange = (e) => {
    setTermsChecked({
      ...termsChecked,
      [e.target.id]: e.target.checked,
    });
  };

  const allTermsChecked = Object.values(termsChecked).every(Boolean);

  const handlePayment = async () => {
    if (allTermsChecked && selectedPayment === 'toss') {
      try {
        const totalAmount = price + price / 10;
        router.push(`/pay/toss?amount=${totalAmount}&orderId=order_${Date.now()}&selectedTime=${selectedTime}&orderName=${selectedTime} 채팅 이용권`);
      } catch (error) {
        console.error(error);
        alert('Payment request failed');
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-1/2 bg-gray-100 p-12">
          <h2 className="text-gray-700 text-2xl mb-5">아띠 전문가 상담 결제하기</h2>
          <button
            className={`border-2 text-lg px-4 py-2 rounded-md cursor-pointer mr-2 mb-2 ${
              selectedTime === "30분" ? 'border-blue-500 text-blue-500' : 'border-black text-black'
            }`}
            onClick={() => handleButtonClick("30분", 50000)}
          >
            30분
          </button>
          <button
            className={`border-2 text-lg px-4 py-2 rounded-md cursor-pointer ${
              selectedTime === "60분" ? 'border-blue-500 text-blue-500' : 'border-black text-black'
            }`}
            onClick={() => handleButtonClick("60분", 100000)}
          >
            60분
          </button>
          {selectedTime && (
            <>
              <h4 className="mt-5">KRW &#8361; {price + price / 10}원 &nbsp;&nbsp;{selectedTime}</h4>
              <div>
                <span className="text-left inline-block w-1/2 text-gray-500">{selectedTime} 채팅 이용권</span>
                <span className="text-right inline-block w-1/2 text-gray-500">KRW &#8361; {price}</span>
              </div>
              <div>
                <span className="text-left inline-block w-1/2 text-gray-500">소계</span>
                <span className="text-right inline-block w-1/2 text-gray-500">KRW &#8361; {price}</span>
              </div>
              <div>
                <span className="text-left inline-block w-1/2 text-gray-500">부가가치세(10%)</span>
                <span className="text-right inline-block w-1/2 text-gray-500">KRW &#8361; {price / 10}</span>
              </div>
              <h4>지불 총액 KRW &#8361; {price + price / 10}원</h4>
            </>
          )}
        </div>
        <div className="h-[95vh] w-[5px] bg-black"></div>
        <div className="w-1/2 bg-white p-12">
          <h4 className="border-b border-black pb-2 mb-4">결제 방법</h4>
          <div className="flex items-center justify-around mb-5">
            <div
              className={`cursor-pointer border-2 p-2 rounded-md ${selectedPayment === 'toss' ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setSelectedPayment('toss')}
            >
              <img alt="토스" src="../../Toss_Logo_Primary.png" width="100px" height="auto" />
            </div>
            <div
              className={`cursor-pointer border-2 p-2 rounded-md ${selectedPayment === 'kakaopay' ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setSelectedPayment('kakaopay')}
            >
              <img alt="카카오페이" src="../../kakaopay.png" width="100px" height="auto" />
            </div>
          </div>
          <h4 className="border-b border-black pb-2 mb-4">이용약관</h4>
          <div className="mb-4">
            <input type="checkbox" id="termsCheckbox1" checked={termsChecked.termsCheckbox1} onChange={handleCheckboxChange} />
            <label htmlFor="termsCheckbox1" className="text-lg font-bold ml-2">회원 탈퇴 및 자격 상실 등</label>
            <div className="border border-black max-h-36 overflow-y-auto mt-2 p-2">
              {termsContent1}
            </div>
          </div>
          <div className="mb-4">
            <input type="checkbox" id="termsCheckbox2" checked={termsChecked.termsCheckbox2} onChange={handleCheckboxChange} />
            <label htmlFor="termsCheckbox2" className="text-lg font-bold ml-2">청약 철회</label>
            <div className="border border-black max-h-36 overflow-y-auto mt-2 p-2">
              {termsContent2}
            </div>
          </div>
          <div className="mb-4">
            <input type="checkbox" id="termsCheckbox3" checked={termsChecked.termsCheckbox3} onChange={handleCheckboxChange} />
            <label htmlFor="termsCheckbox3" className="text-lg font-bold ml-2">결제 취소 및 환불</label>
            <div className="border border-black max-h-36 overflow-y-auto mt-2 p-2">
              {termsContent3}
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <button onClick={handlePayment} className={`border-2 border-black text-lg px-4 py-2 rounded-md cursor-pointer ${allTermsChecked ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!allTermsChecked}>결제</button>
            <button className="border-2 border-black text-lg px-4 py-2 rounded-md cursor-pointer">취소</button>
          </div>
        </div> {/* 오른쪽 영역 끝 */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
