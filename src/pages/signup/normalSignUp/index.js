import { useState } from "react";
import { signup } from "@/api/user/user.js";
import KakaoSignup from "@/components/user/kakaoSignup";
import NaverSignup from "@/components/user/naverSignup";
import MoveMainLogo from "@/components/common/MoveMainLogo";
import Modal from "@/components/common/Modal";
import { authStore } from "@/pages/stores/authStore";

export default function NormalSignUp() {
  //-----------------------------모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "/login";
  };
  //----------------------------
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    userName: "",
    email: "",
    birthDate: "",
    gender: "",
    userType: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [genderErrorMessage, setGenderErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      userId,
      userName,
      email,
      password,
      confirmPassword,
      birthDate,
      gender,
      userType,
    } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!gender) {
      setGenderErrorMessage("성별을 선택해주세요.");
      return;
    } else {
      setGenderErrorMessage("");
    }

    const signUpData = {
      userId,
      password,
      userName,
      email,
      birthDate,
      gender,
      userType,
    };

    try {
      signUpData.userType = "U";
      await signup(signUpData);
      setSuccessMessage(
        "회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동해주세요."
      );
      setFormData({
        userId: "",
        password: "",
        confirmPassword: "",
        userName: "",
        email: "",
        birthDate: "",
        gender: "",
        userType: "",
      });
      setErrorMessage("");
      setGenderErrorMessage("");
      openModal();
    } catch (error) {
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
      <MoveMainLogo />
      <div className="mt-10 text-2xl font-bold text-gray-800">
        <h1>회원가입</h1>
      </div>
      <div className="flex flex-col w-full max-w-md p-6 mt-5 overflow-y-auto bg-white rounded-lg shadow-md max-h-[70vh]">
        <form onSubmit={handleSubmit}>
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
              value={formData.userId}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              비밀번호:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              비밀번호 확인:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block mb-1 text-sm font-semibold text-gray-800"
            >
              이름:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
            />
          </div>
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
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-800">
              성별:
            </label>
            <div className="flex items-center">
              <label className="flex items-center mr-4">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="M"
                  className="mr-1"
                  checked={formData.gender === "M"}
                  onChange={handleInputChange}
                />
                남성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="F"
                  className="mr-1"
                  checked={formData.gender === "F"}
                  onChange={handleInputChange}
                />
                여성
              </label>
            </div>
            {genderErrorMessage && (
              <p className="mt-1 text-xs text-red-500">{genderErrorMessage}</p>
            )}
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
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              회원가입
            </button>
          </div>
          <div className="mt-6">
            <KakaoSignup />
            <NaverSignup />
          </div>
        </form>
        {successMessage && (
          <p className="mt-4 text-green-600">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="회원 가입 완료."
        content={authStore.userName}
        content2="가입을 축하합니다."
        imgUrl="signUp"
      />
    </div>
  );
}
