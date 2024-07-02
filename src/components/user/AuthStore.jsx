// AuthStatus.js
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { authStore } from "src/stores/authStore";
import { logoutKakao, logoutNaver } from "@/api/user/user";
import MyPageNavBar from "../common/MyPageNavBar";
import Modal2 from "../common/Modal2";
import useLogout from "src/hooks/userLogout";

const AuthStatus = observer(() => {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [isClient, setIsClient] = useState(false);
  const { logout, showModal, closeModal } = useLogout(); // 커스텀 훅 사용

  useEffect(() => {
    setUserType(authStore.userType);
    authStore.checkLoggedIn();
    setIsClient(true); // 클라이언트에서만 true로 설정
  }, []);

  useEffect(() => {
    const loginType = localStorage.getItem("loginType");
    if (loginType) {
      authStore.setLoginType(loginType);
    }
  }, []);

  const handleLoginClick = async () => {
    try {
      if (!authStore.loggedIn && !authStore.socialLoggedIn) {
        router.push("/login"); // 로그인 페이지로 이동
      } else if (authStore.socialLoggedIn) {
        const loginType = authStore.loginType;
        if (loginType === "kakao") {
          await logoutKakao();
        } else if (loginType === "naver") {
          await logoutNaver();
        }
        authStore.setSocialLoggedIn(false); // 소셜 로그아웃 처리
        localStorage.removeItem("loginType");
        logout(); // 로그아웃 호출
      } else {
        await logout();
        authStore.setLoggedIn(false); // 일반 로그아웃 처리
        localStorage.removeItem("loginType");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleMyPageClick = () => {
    const loginType = localStorage.getItem("loginType");
    if (loginType === "regular") {
      router.push("/user/mypage"); // 일반 유저 마이페이지
    } else {
      router.push("/user/snsInfo"); // 소셜 유저 마이페이지
    }
  };

  if (!isClient) {
    // 클라이언트에서 렌더링하기 전까지는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center">
        <button onClick={handleLoginClick}>
          {authStore.loggedIn || authStore.socialLoggedIn ? "로그아웃" : "로그인"}
        </button>
        {(authStore.loggedIn || authStore.socialLoggedIn) && (
          <>
            <div className="relative inline-block group">
              <button onClick={handleMyPageClick} className="text-black rounded">
                MyPage
              </button>
              <MyPageNavBar userType={userType} />
            </div>
            <p>{authStore.userName}님</p>
          </>
        )}
        {!authStore.loggedIn && !authStore.socialLoggedIn && (
          <button onClick={() => router.push("/signup")}>회원가입</button>
        )}
      </div>
      {showModal && <Modal2 isOpen={showModal} onClose={closeModal} title="로그아웃" content="로그아웃 되었습니다." />}
    </div>
  );
});

export default AuthStatus;
