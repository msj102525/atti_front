import React, { useState } from "react";
import { sendCodeToEmail } from "@/api/doctor/doctor.js";
import { signup } from "@/api/user/user.js";
import Modal from "@/components/common/modal";
import MoveMainLogo from "@/components/common/MoveMainLogo";

export default function DoctorSignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [code, setCode] = useState("");
  const [emailReadOnly, setEmailReadOnly] = useState(false);
  const [codeReadOnly, setCodeReadOnly] = useState(false);
  const [completeCertificate, setCompleteCertificate] = useState(false);

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pw2Valid, setPw2Valid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [birthDateValid, setBirthDateValid] = useState(false);
  const [genderValid, setGenderValid] = useState(false);
  const [maleValid, setMaleValid] = useState(false);
  const [femaleValid, setFemaleValid] = useState(false);

  const [codeInput, setCodeInput] = useState(false);

  const [emailButtonColor, setEmailButtonColor] = useState("grey");
  const [codeButtonColor, setCodeButtonColor] = useState("grey");
  const [isVerified, setIsVerified] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailVerification = async () => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    setCode(verificationCode);
    await sendCodeToEmail(email, verificationCode, name);
  };

  const validateForm = () => {
    return (
      idValid &&
      pwValid &&
      pw2Valid &&
      nameValid &&
      emailValid &&
      birthDateValid &&
      genderValid &&
      codeReadOnly
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    const signUpData = {
      userId: id,
      userName: name,
      email: email,
      password: pw,
      birthDate: birthDate,
      gender: gender,
      userType: "D",
    };

    try {
      await signup(signUpData);
      console.log("성공!");
      openModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const sendCode = () => {
    setCodeInput(true);
    setEmailReadOnly(true);
    setCompleteCertificate(true);
    handleEmailVerification();
  };

  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,20}$/;
    setIdValid(regex.test(e.target.value));
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(e.target.value));
  };

  const handlePw2 = (e) => {
    const value = e.target.value;
    setPw2(value);
    setPw2Valid(value === pw);
  };

  const handleName = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    setNameValid(nameValue.length > 0 && nameValue.length < 6);
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (
      emailValue.includes("@kma.org") ||
      emailValue.includes("smkr96@gachon.ac.kr")
    ) {
      setEmailValid(true);
      setEmailButtonColor("teal-400");
    } else {
      setEmailValid(false);
      setEmailButtonColor("grey");
    }
  };

  const handleBirthDate = (e) => {
    const birthDateValue = e.target.value;
    setBirthDate(birthDateValue);
    const birthDate = new Date(birthDateValue);
    const nowDate = new Date();
    setBirthDateValid(
      birthDateValue.length > 0 && birthDate.getTime() < nowDate.getTime()
    );
  };

  const handleGenderChange = (event) => {
    const value = event.target.value;
    if (value === "M") {
      setGender("M");
      setGenderValid(true);
      setMaleValid(true);
      setFemaleValid(false);
    } else if (value === "F") {
      setGender("F");
      setGenderValid(true);
      setFemaleValid(true);
      setMaleValid(false);
    }
  };

  const verifyCode = (e) => {
    if (e.target.value === code.toString()) {
      setIsVerified(true);
      setCodeButtonColor("teal-400");
      setCodeReadOnly(true);
    } else {
      setIsVerified(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen overflow-auto bg-gray-100">
      <MoveMainLogo />
      <div className="mt-10 text-2xl font-bold text-center text-gray-800">
        의사 회원가입
      </div>
      <div className="flex flex-col items-center w-full max-w-md px-4 py-6 mt-5 overflow-y-auto bg-white rounded-md shadow-md">
        <div className="w-full">
          <div className="mb-1 text-sm font-semibold text-gray-800">아이디</div>
          <div className="flex rounded-lg p-2.5 mb-4 bg-white border border-gray-300 focus-within:border-teal-400">
            <input
              className="w-full h-5 text-sm font-normal text-gray-700 border-none outline-none"
              type="text"
              placeholder="아이디 입력 (4자~20자)의 영어와 숫자만 가능"
              value={id}
              onChange={handleId}
            />
          </div>
          <div className="mb-2 text-xs text-red-500">
            {!idValid && id.length > 0 && (
              <div>사용할 수 없는 아이디입니다</div>
            )}
          </div>

          <div className="mb-1 text-sm font-semibold text-gray-800">
            비밀번호
          </div>
          <div className="flex rounded-lg p-2.5 mb-4 bg-white border border-gray-300 focus-within:border-teal-400">
            <input
              className="w-full h-5 text-sm font-normal text-gray-700 border-none outline-none"
              type="password"
              placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="mb-2 text-xs text-red-500">
            {!pwValid && (
              <div>문자, 숫자, 특수문자 포함 8~20자로 입력해주세요</div>
            )}
          </div>
          <div className="mb-1 text-sm font-semibold text-gray-800">
            비밀번호 재입력
          </div>
          <div className="flex rounded-lg p-2.5 mb-4 bg-white border border-gray-300 focus-within:border-teal-400">
            <input
              className="w-full h-5 text-sm font-normal text-gray-700 border-none outline-none"
              type="password"
              placeholder="비밀번호 재입력"
              value={pw2}
              onChange={handlePw2}
            />
          </div>
          <div className="mb-2 text-xs text-red-500">
            {!pw2Valid && <div>비밀번호가 일치하지 않습니다.</div>}
          </div>
          <div className="mb-1 text-sm font-semibold text-gray-800">이름</div>
          <div className="flex rounded-lg p-2.5 mb-4 bg-white border border-gray-300 focus-within:border-teal-400">
            <input
              className="w-full h-5 text-sm font-normal text-gray-700 border-none outline-none"
              type="text"
              placeholder="ex ) 홍길동"
              value={name}
              onChange={handleName}
            />
          </div>
          <div className="mb-2 text-xs text-red-500">
            {!nameValid && <div>올바른 이름을 입력해주세요</div>}
          </div>
          <div className="mb-1 text-sm font-semibold text-gray-800">
            이메일주소
          </div>
          <div className="flex justify-between mb-4">
            <div className="flex rounded-lg p-2.5 w-2/3 bg-white border border-gray-300 focus-within:border-teal-400">
              <input
                className="w-full h-5 text-sm font-normal text-gray-700 border-none outline-none"
                type="email"
                placeholder="의사협회 이메일을 입력해주세요"
                value={email}
                onChange={handleEmail}
                readOnly={emailReadOnly}
              />
            </div>
            <div className="flex justify-center">
              <button
                className={`ml-2 h-full px-3 rounded-full font-bold text-xs text-white ${
                  emailValid && !completeCertificate
                    ? "bg-teal-400 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={sendCode}
                disabled={!emailValid}
              >
                확인코드 전송
              </button>
            </div>
          </div>
          <div className="mb-2 text-xs text-red-500">
            {!emailValid && (
              <div>의사협회 이메일을 입력해주세요! (예: sample@kma.org)</div>
            )}
          </div>
          {codeInput && (
            <div>
              <div className="mb-1 text-sm font-semibold text-gray-800">
                인증 코드
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex rounded-lg p-2.5 w-2/3 bg-white border border-gray-300 focus-within:border-teal-400">
                  <input
                    className="w-full h-5 text-sm font-normal text-gray-700 border-none outline-none"
                    type="text"
                    placeholder="이메일로 전송온 코드를 입력해주세요!"
                    onChange={verifyCode}
                    readOnly={codeReadOnly}
                  />
                </div>
                <div className="ml-2 text-xs text-teal-400">
                  {codeReadOnly && <div>인증성공!</div>}
                </div>
              </div>
              <div className="mb-2 text-xs text-red-500">
                {!isVerified && <div>코드가 일치하지 않습니다!</div>}
              </div>
            </div>
          )}
          <div className="mb-1 text-sm font-semibold text-gray-800">
            생년월일
          </div>
          <div className="flex rounded-lg p-2.5 mb-4 bg-white border border-gray-300 focus-within:border-teal-400">
            <input
              className="w-full h-5 text-sm font-normal text-gray-700 border-none outline-none"
              type="date"
              value={birthDate}
              onChange={handleBirthDate}
            />
          </div>
          <div className="mb-2 text-xs text-red-500">
            {!birthDateValid && <div>올바른 생일을 입력해주세요!</div>}
          </div>
          <div className="mb-1 text-sm font-semibold text-gray-800">성별</div>
          <div className="flex justify-start mb-4">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="radio"
                id="male"
                value="M"
                className="mr-1"
                onChange={handleGenderChange}
                checked={maleValid}
              />
              남성
            </label>
            <label className="flex items-center ml-3 text-sm text-gray-700">
              <input
                type="radio"
                id="female"
                value="F"
                className="mr-1"
                onChange={handleGenderChange}
                checked={femaleValid}
              />
              여성
            </label>
          </div>
          {!genderValid && (
            <div className="mb-2 text-xs text-red-500">
              성별을 선택해주세요!
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-md px-4">
        <button
          onClick={handleSubmit}
          className="w-full h-full mt-8 mb-4 font-bold text-white bg-teal-400 rounded-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!validateForm()}
        >
          회원가입
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`회원가입을 축하합니다, ${name}님!`}
        content="확인버튼을 누르면"
        content2="추가정보 등록페이지로 이동합니다!"
        imgUrl="signUp"
      />
    </div>
  );
}
