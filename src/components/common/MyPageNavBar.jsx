// components/NavigationBar.js
import React from "react";
import Link from "next/link";

const MyPageNavBar = ({ userType }) => {
  return (
    <div className="absolute top-0 hidden w-40 p-4 bg-white shadow-lg group-hover:block left-8">
      <ul>
        <li className="py-1">
          <Link href="/chat/chatList">채팅리스트</Link>
        </li>
        <li className="py-1">
          <Link href="/user/mypage">마이 페이지</Link>
        </li>
        {userType == "D" && (
          <li className="py-1">
            <Link href="/doctor/mypage">병원정보 등록</Link>
          </li>
        )}
        {userType == "U" && (
          <li className="py-1">
            <Link href="/review">내가 쓴 리뷰</Link>
          </li>
        )}
        {userType == "A" && (
          <li className="py-1">
            <Link href="/admin/memberList">관리자페이지</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MyPageNavBar;
