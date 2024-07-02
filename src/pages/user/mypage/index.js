import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import Header from "@/pages/common/Header";
import styles from "@/styles/user/mypage.module.css";
import Modal2 from "@/components/common/Modal";
import Footer from "@/pages/common/Footer";
import { getUserData, updateUser, deleteUser } from "@/api/user/userApi";
import { changePassword } from "@/api/user/find";
import { uploadProfilePhoto, deleteProfilePhoto } from "@/api/doctor/doctorUpdate";
import { authStore } from "src/stores/authStore";
import { useRouter } from "next/router";

const Mypage = observer(() => {
  const [profileUrl, setProfileUrl] = useState(authStore.profileUrl);
  const fileInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectPath, setRedirectPath] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const router = useRouter();

  const serverImage = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const userId = authStore.userId;
          const data = await getUserData(userId, token);
          authStore.setUserId(data.userId);
          authStore.setUserName(data.userName);
          authStore.setNickName(data.nickName);
          authStore.setEmail(data.email);
          authStore.setProfileUrl(data.profileUrl);
          authStore.setUserType(data.userType);
          authStore.setGender(data.gender);
          authStore.setPhone(data.phone);
          authStore.setLoginType(data.loginType);
          authStore.setBirthDate(data.birthDate);
          setProfileUrl(data.profileUrl);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    setProfileUrl(authStore.profileUrl);
  }, [profileUrl]);

  const handleUpdate = async () => {
    if (authStore.password !== authStore.confirmPassword) {
      setModalMessage("비밀번호가 일치하지 않습니다.");
      setIsModalOpen(true);
      return;
    }

    try {
      const updatedUser = {
        userId: authStore.userId,
        userName: authStore.userName,
        nickName: authStore.nickName,
        password: authStore.password,
        email: authStore.email,
        phone: authStore.phone,
        gender: authStore.gender,
        birthDate: authStore.birthDate,
        profileUrl: authStore.profileUrl,
      };
      await updateUser(updatedUser);

      if (currentPassword) {
        await changePassword({
          currentPassword: currentPassword,
          newPassword: authStore.password,
          userId: authStore.userId,
        });
      }

      setModalMessage("수정 완료!");
      setIsModalOpen(true);
      setRedirectPath("/");
    } catch (error) {
      console.error(error);
      setModalMessage("수정 실패!");
      setIsModalOpen(true);
    }
  };


/* eslint-disable no-restricted-globals */
  const handleCancel = async () => {
    if (confirm("탈퇴 하시겠습니까?")) {
      try {
        await deleteUser(authStore.userId);
        window.localStorage.clear();
        setModalMessage("탈퇴 완료!");
        setIsModalOpen(true);
        setRedirectPath("/");
      } catch (error) {
        console.error(error);
        setModalMessage("탈퇴 실패!");
        setIsModalOpen(true);
      }
    }
  };

  /* eslint-enable no-restricted-globals */

  const closeModal = () => {
    setIsModalOpen(false);
    if (redirectPath) {
      router.push(redirectPath);
    }
  };
  

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);

      try {
        const userId = authStore.userId;
        const response = await uploadProfilePhoto(file, userId);
        const filePath = response.filePath;
        authStore.setProfileUrl(filePath);
        setProfileUrl(serverImage + filePath); 
        setModalMessage("프로필 사진 업로드 완료!\n사진 등록 시간이 걸려요!");
      } catch (error) {
        console.error("프로필 사진 업로드 오류:", error);
        setModalMessage(`프로필 사진 업로드 실패: ${error.message}`);
      }
      setIsModalOpen(true);
    }
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     try {
  //       const userId = authStore.userId;
  //       const response = await uploadProfilePhoto(file, userId);
  //       const profileUrl = `${serverImage}${response.filePath}`;  // 서버 URL과 결합
  //       authStore.setProfileUrl(profileUrl);
  //       setProfileUrl(profileUrl);
  //       setModalMessage("프로필 사진 업로드 완료!\n사진 등록 후 올라오는 시간이 걸려요!");
  //     } catch (error) {
  //       console.error("프로필 사진 업로드 오류:", error);
  //       setModalMessage(`프로필 사진 업로드 실패: ${error.message}`);
  //     }
  //     setIsModalOpen(true);
  //   }
  // };
  

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     try {
  //       const userId = authStore.userId;
  //       const response = await uploadProfilePhoto(file, userId);
  //       const profileUrl = response.filePath;
  //       authStore.setProfileUrl(profileUrl);
  //       setProfileUrl(profileUrl);
  //       setModalMessage("프로필 사진 업로드 완료!\n사진 등록 후 올라오는 시간이 걸려요!");
  //     } catch (error) {
  //       console.error("프로필 사진 업로드 오류:", error);
  //       setModalMessage(`프로필 사진 업로드 실패: ${error.message}`);
  //     }
  //     setIsModalOpen(true);
  //   }
  // };
  

  const handleImageDelete = async () => {
    try {
      const userId = authStore.userId;
      await deleteProfilePhoto(userId);
      authStore.setProfileUrl(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      setProfileUrl(null);
      setModalMessage("프로필 사진 삭제 완료!");
    } catch (error) {
      console.error("프로필 사진 삭제 오류:", error);
      setModalMessage("프로필 사진 삭제 실패!");
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center h-screen p-4">
      <Header />
      <Head>
        <title>회원 정보 페이지</title>
      </Head>
      <div className="mt-10 font-bold text-gray-900">
        <h1>내 정보 수정</h1>
      </div>
      <div className="flex flex-col w-full max-w-md p-6 mt-5 overflow-y-auto bg-white rounded-lg shadow-md max-h-[70vh]">
        <div className="mb-4">
          <label
            htmlFor="profileUrl"
            className="block mb-1 text-sm font-semibold text-gray-800"
          >
            프로필 사진:
          </label>
          <img
            src={
              profileUrl
                ? profileUrl.includes("http")
                  ? profileUrl
                  : serverImage + profileUrl
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
            className="w-32 h-32 mb-2 rounded-full"
          />
          <input
            type="file"
            id="profileUrl"
            name="profileUrl"
            style={{ display: "none" }}
            accept="image/jpg,image/png,image/jpeg"
            onChange={handleFileChange}
            ref={fileInput}
          />
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full cursor-pointer"
              onClick={() => fileInput.current.click()}
            >
              프로필 사진 선택
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 font-bold text-white bg-red-400 rounded-full cursor-pointer"
              onClick={handleImageDelete}
            >
              프로필 사진 삭제
            </button>
          </div>
        </div>

        <form className={styles.form}>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              아이디:
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={authStore.userId}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              성명:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={authStore.userName}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nickName"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              닉네임:
            </label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={authStore.nickName}
              onChange={(e) => authStore.setNickName(e.target.value)}
            />
          </div>
          {authStore.loginType === "regular" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block mb-1 text-sm font-semibold text-gray-800"
                >
                  현재 비밀번호:
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-semibold text-gray-800"
                >
                  새 비밀번호:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
                  value={authStore.password}
                  onChange={(e) => authStore.setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 text-sm font-semibold text-gray-800"
                >
                  새 비밀번호 확인:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
                  value={authStore.confirmPassword}
                  onChange={(e) => authStore.setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              이메일:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={authStore.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              전화번호:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={authStore.phone}
              onChange={(e) => authStore.setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-800">
              성별:
            </label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="M"
                checked={authStore.gender === "M"}
                onChange={(e) => authStore.setGender(e.target.value)}
              />
              <label htmlFor="male" className="mr-2">
                남
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="F"
                checked={authStore.gender === "F"}
                onChange={(e) => authStore.setGender(e.target.value)}
              />
              <label htmlFor="female">여</label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="birthDate"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              생년월일:
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={authStore.birthDate}
              onChange={(e) => authStore.setBirthDate(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer"
              onClick={handleUpdate}
            >
              수정
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 font-bold text-white bg-red-400 rounded-full cursor-pointer"
              onClick={handleCancel}
            >
              탈퇴
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <Modal2
        isOpen={isModalOpen}
        onClose={closeModal}
        title="알림"
        content={modalMessage}
      />
    </div>
  );
});

export default Mypage;
