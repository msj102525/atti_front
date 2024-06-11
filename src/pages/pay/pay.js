import { useState, useEffect } from 'react';
import styles from "../../styles/pay/pay.module.css"; // 스타일 파일을 임포트
import { termsContent1, termsContent2, termsContent3 } from './payContent';


function App() {
  const [selectedTime, setSelectedTime] = useState("60분"); // 기본값을 60분으로 설정
  const [price, setPrice] = useState(100000); // 60분에 해당하는 가격으로 설정

  const handleButtonClick = (time, price) => {
      setSelectedTime(time);
      setPrice(price);
  };

  useEffect(() => {
      // 페이지가 처음 로딩될 때 60분이 선택되고 해당 내용이 표시되도록 설정
      handleButtonClick("60분", 100000);
  }, []); // 빈 배열을 전달하여 이 효과가 한 번만 실행되도록 함

  return (
      <div className={styles.container}>
          {/* 왼쪽 영역 */}
          <div className={styles.leftsection}>
              <h2 className={styles.title}>아띠 전문가 상담 결제하기</h2>
              <button className={styles.time} onClick={() => handleButtonClick("30분", 50000)}>30분</button>
              <span style={{ margin: '0 10px' }}></span>
              <button className={styles.time} onClick={() => handleButtonClick("60분", 100000)}>60분</button>
              {selectedTime && (
                  <>
                      <h4>KRW &#8361; {price + price / 10}원 &nbsp;&nbsp;{selectedTime}</h4>
                      <div>
                          <span style={{ textAlign: "left", display: "inline-block", width: "50%", color: "rgba(0, 0, 0, 0.342)" }}>{selectedTime} 채팅 이용권</span>
                          <span style={{ textAlign: "right", display: "inline-block", width: "50%", color: "rgba(0, 0, 0, 0.342)" }}>KRW &#8361; {price}</span>
                      </div>
                      <div>
                          <span style={{ textAlign: "left", display: "inline-block", width: "50%", color: "rgba(0, 0, 0, 0.342)" }}>소계</span>
                          <span style={{ textAlign: "right", display: "inline-block", width: "50%", color: "rgba(0, 0, 0, 0.342)" }}>KRW &#8361; {price}</span>
                      </div>
                      <div>
                          <span style={{ textAlign: "left", display: "inline-block", width: "50%", color: "rgba(0, 0, 0, 0.342)" }}>부가가치세(10%)</span>
                          <span style={{ textAlign: "right", display: "inline-block", width: "50%", color: "rgba(0, 0, 0, 0.342)" }}>KRW &#8361; {price / 10}</span>
                      </div>
                      <h4>지불 총액 KRW &#8361; {price + price / 10}원</h4>
                  </>
              )}
          </div>
        {/* 수직선 */}
        <div className={styles.verticalline}></div>
      {/* 오른쪽 영역 */}
      <div className={styles.rightsection}>
        <h4 style={{ borderBottom: '1px solid #000' }}>결제 방법</h4>
        <img alt="토스" src="../../Toss_Logo_Primary.png" width="100px" height="auto" style={{ border: '1px solid black' }}/>
        <h4 style={{ borderBottom: '1px solid #000' }}>이용약관</h4>
        <div>
            <input type="checkbox" id="termsCheckbox" />
            <label htmlFor="termsCheckbox" style={{ fontSize: '20px', fontWeight: 'bold' }}>회원 탈퇴 및 자격 상실 등</label>
            <div style={{ border:'1px solid black', maxHeight: '150px', overflowY: 'auto' }}>
            {termsContent1}
            </div>
        </div>
        <div>
            <input type="checkbox" id="termsCheckbox" />
            <label htmlFor="termsCheckbox" style={{ fontSize: '20px', fontWeight: 'bold' }}>청약 철회</label>
            <div style={{ border:'1px solid black', maxHeight: '150px', overflowY: 'auto' }}>
            {termsContent2}
            </div>
        </div>
        <div>
            <input type="checkbox" id="termsCheckbox" />
            <label htmlFor="termsCheckbox" style={{ fontSize: '20px', fontWeight: 'bold' }}>결제 취소 및 환불</label>
            <div style={{ border:'1px solid black', maxHeight: '150px', overflowY: 'auto' }}>
            {termsContent3}
            </div>
        </div>
        <div style={{ margin: '50px 100px' }}>
        <button className={styles.time}>결제</button>
        <span style={{ margin: '100px 50px' }}></span>
        <button className={styles.time}>취소</button>
        </div>
      </div>    {/* 오른쪽 영역 끝 */}

      
    </div>
  );
}

export default App;
