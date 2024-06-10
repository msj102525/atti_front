import React, { useState } from 'react';
import styles from "../../styles/faq/faqList.module.css"; // 스타일 파일을 임포트

function SearchForm() {
    const [selectedValue, setSelectedValue] = useState('');
    const [showDateInputs, setShowDateInputs] = useState(false);
  
    const handleSelectChange = (event) => {
      const value = event.target.value;
      setSelectedValue(value);
      setShowDateInputs(value === 'date');
    };
  
    return (
      <div className="searchdiv">
        <form action="nsearch.do" method="get">
          <select name="action" id="searchselect" onChange={handleSelectChange}>
            <option value="title">제목</option>
            <option value="writer">작성자</option>
            <option id="date" value="date">날짜</option>
          </select>
          {showDateInputs ? (
            <>
              <input type="date" name="begin" /> 
              <input type="date" name="end" /> 
            </>
          ) : (
            <input type="text" id="searchtext" name="keyword" placeholder="검색어 입력" />
          )}
          <input type="submit" className="searchbtn" value="검색" />
        </form>
        <button className="writerB" onClick={() => console.log('글쓰기 버튼 클릭')}>글쓰기</button>
      </div>
    );
  }

function QnA() {
  return (
    <div>
    <ul className={`${styles.qna}`}>
        <h1>FAQ</h1>
      <li>
        <input type="checkbox" id="qna-1" />
        <label htmlFor="qna-1">다른 사람 명의의 계좌로 환불받을 수 있나요?</label>
        <div>
          <p>다른 사람 명의로는 환불할 수 없습니다. 고객님 본인 명의 계좌로만 환불이 가능합니다.</p>
        </div>
      </li>
      <li>
        <input type="checkbox" id="qna-2" />
        <label htmlFor="qna-2">등록한 환불계좌를 등록/변경하고 싶어요.</label>
        <div>
          <p>마이페이지에서 환불계좌 등록 및 수정이 가능합니다. 환불계좌는 주문자 명의의 본인 계좌만 등록할 수 있습니다.</p>
          <p>주문 진행 상태가 '환불진행중' 또는 '환불완료' 에서는 환불계좌를 변경할 수 없습니다.</p>
        </div>
      </li>
      <li>
        <input type="checkbox" id="qna-3" />
        <label htmlFor="qna-3">반품 신청을 철회하고 싶어요.</label>
        <div>
          <p>반품할 상품을 아직 보내지 않은 경우, 마이페이지에서 반품철회를 하실 수 있습니다.</p>
          <p>반품철회 후 택배사에서 상품 수거가 된 것으로 확인될 경우 해당 주문은 반품처리한 것으로 재 변경됩니다.</p>
        </div>
      </li>
      <li>
        <input type="checkbox" id="qna-4" />
        <label htmlFor="qna-4">배송된 상품이 부재중으로 반송된 경우 어떻게 하나요?</label>
        <div>
          <p>부재 등의 사유로 반송된 상품은 "마이페이지 - 주문 조회"]"에서 택배사 영업소, 또는 배송 담당 택배원 연락처를 통해 재배송 요청을 할 수 있습니다. 상품이 이미 반송되어 해당 업체로 입고된 경우, 왕복 배송비를 추가 부담하셔야 합니다.</p>
        </div>
      </li>
      <li>
        <input type="checkbox" id="qna-5" />
        <label htmlFor="qna-5">상품에 대해서 문의하려면 어떻게 해야 하나요?</label>
        <div>
          <p>상품에 관한 내용은 상품상세 화면에 자세히 안내되어 있습니다. 마이페이지 - 주문내역에서 주문한 상품을 선택하면 상세페이지로 이동합니다.</p>
          <p>상품 상세 내용에 표시되어 있지 않은 내용은 판매자에게 문의해 주십시오.</p>
          <p>판매자에게 문의</p>
          <p>1. "마이페이지 - 주문내역에서 상품 선택 - 배송/교환/반품 안내"에 표기된 판매자 연락처로 문의</p>
          <p>2. "["마이페이지 - 1:1문의하기 - 문읜타입에서 판매자에게 문의하기"를 선택한 후 질의 내용 작성</p>
        </div>
      </li>
    </ul>
    <SearchForm />
    </div>
  );
}

export default QnA;
