/*src/components/user/AuthStatus.js*/
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { authStore } from "@/pages/stores/authStore";
import { logout } from "@/api/user/user";
import NavButton from "../doctor/NavButton";
import KakaoLogin from "./kakaoLogin";
import NaverLogin from "./naverLogin";

const AuthStatus = observer(() => {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setUserType(authStore.userType);
    authStore.checkLoggedIn();
    setIsClient(true); // 클라이언트에서만 true로 설정
  }, []);

  const handleLoginClick = async () => {
    try {
      if (!authStore.loggedIn && !authStore.socialLoggedIn) {
        router.push("/login"); // 로그인 페이지로 이동
      } else if (authStore.socialLoggedIn) {
        await KakaoLogin();
        await NaverLogin();
        authStore.setSocialLoggedIn(false); // 소셜 로그아웃 처리
        router.push("/");
      } else {
        await logout();
        authStore.setLoggedIn(false); // 일반 로그아웃 처리
        router.push("/");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleMyPageClick = () => {
    router.push("/user/mypage"); // mypage 페이지로 이동
  };

  const handleMove = async () => {
    router.push("/chat/chatList");
  };

  if (!isClient) {
    // 클라이언트에서 렌더링하기 전까지는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center mr-8">
        <NavButton userType={userType} />
        <button onClick={handleMove}>채팅 리스트</button>
      </div>
      <div>
        <button onClick={handleLoginClick}>
          {authStore.loggedIn || authStore.socialLoggedIn
            ? "로그아웃"
            : "로그인"}
        </button>
        <br />
        {(authStore.loggedIn || authStore.socialLoggedIn) && (
          <>
            <div>
              <button onClick={handleMyPageClick}>MyPage</button>
            </div>
            <p>{authStore.userName}님</p>
          </>
        )}
        {!authStore.loggedIn && !authStore.socialLoggedIn && (
          <button onClick={() => router.push("/signup")}>회원가입</button>
        )}
      </div>
    </div>
  );
});

export const sendTempPassword = (data) => {
  return axios.post("/send-temp-password", data).then((res) => res);
};

export const verifyTempPassword = (data) => {
  return axios.post("/verify-temp-password", data).then((res) => res);
};

export default AuthStatus;
