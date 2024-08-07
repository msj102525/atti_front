// useLogout.js
import { useState } from "react";
import instance from "../api/axiosApi";
import { useRouter } from "next/router";

const useLogout = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const logout = async () => {
    const token = localStorage.getItem("token");

    try {
      await instance.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // 로컬 스토리지의 모든 항목을 비웁니다.
      localStorage.clear();
      // 모달 표시
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // 메인 페이지로 리다이렉트
    router.push("/");
  };

  return {
    logout,
    showModal,
    closeModal,
  };
};

export default useLogout;
