/*src/components/user/AuthStatus.js*/
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { authStore } from "@/pages/stores/authStore";
import { logout, logoutkakao } from "@/api/user/user";
import MyPageNavBar from "../common/MyPageNavBar";
import { getUserData } from "@/api/user/userApi";
import NavButton from "../doctor/NavButton";

const AuthStatus = observer(() => {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setUserType(authStore.userType);
    authStore.checkLoggedIn();
    setIsClient(true); // 클라이언트에서만 true로 설정
  }, []);

  const redirectToUserTypePage = () => {
    if (userType === "A") {
      router.push("/admin/memberList");
    } else if (userType === "U") {
      router.push("/");
    } else if (userType === "D") {
      router.push("/");
    } else {
      router.push("/");
    }
  };

  const handleLoginClick = async () => {
    try {
      if (!authStore.loggedIn && !authStore.socialLoggedIn) {
        router.push("/login"); // 로그인 페이지로 이동
      } else if (authStore.socialLoggedIn) {
        await logoutkakao();
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

  // const onMouseEnter = () =>{

  // }

  if (!isClient) {
    // 클라이언트에서 렌더링하기 전까지는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center">
        <button onClick={handleLoginClick}>
          {authStore.loggedIn || authStore.socialLoggedIn
            ? "로그아웃"
            : "로그인"}
        </button>
        {(authStore.loggedIn || authStore.socialLoggedIn) && (
          <>
            <div className="relative inline-block group">
              <button
                onClick={handleMyPageClick}
                className="text-black rounded "
              >
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
