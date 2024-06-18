import React, { useState } from "react";
import Header from "@/pages/common/header";
import Footer from "@/pages/common/footer";
import MintButton from "@/components/common/MintButton";
import KakaoAddress from "@/components/doctor/KakaoAddress";

export default function DoctorUpdate() {
  // 부모 컴포넌트에서 주소 관련 상태 관리
  const [address, setAddress] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [careers, setCareers] = useState([]);
  const [educations, setEducations] = useState([]);
  const [profileUrl, setProfileUrl] = useState("");

  const handleProfileChange = () => {
    console.log("프로필 수정");
  };

  //학력 경력 추가함수 ---------------------
  const addEdu = () => {
    const educationInput = document.getElementById("education");
    if (educationInput && educationInput.value.trim() !== "") {
      const originEdu = [...educations];
      originEdu.push(educationInput.value.trim());
      setEducations(originEdu);
    }
    educationInput.value = "";
  };
  const addCareer = () => {
    const careerInput = document.getElementById("career");
    if (careerInput && careerInput.value.trim() !== "") {
      const originCareer = [...careers];
      originCareer.push(careerInput.value.trim());
      setCareers(originCareer);
    }
    careerInput.value = "";
  };
  //학력 경력 삭제함수 ------------------------
  const deleteEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const deleteCareer = (index) => {
    setCareers(careers.filter((_, i) => i !== index));
  };
  return (
    <div>
      <Header />
      <div className="w-[900px] mx-auto">
        <div>
          <div className="mt-8 ml-8 text-3xl">의사회원정보 수정</div>
          <div className="flex flex-wrap mt-8">
            <div className="w-full p-8 md:w-2/3">
              <div className="w-full mb-4">
                <label className="block mb-2 text-xl">병원 이름</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="병원 이름을 입력해주세요"
                />
              </div>
              <KakaoAddress
                address={address}
                setAddress={setAddress}
                zonecode={zonecode}
                setZonecode={setZonecode}
                extraAddress={extraAddress}
                setExtraAddress={setExtraAddress}
                detailAddress={detailAddress}
                setDetailAddress={setDetailAddress}
              />
              <div className="w-full mt-4">
                <label className="block mb-2 text-xl">병원 전화번호</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="병원 전화번호를 입력해주세요"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full p-8 md:w-1/3">
              <div className="flex items-center w-full mb-4">
                <img
                  src="/doctor.png"
                  alt="Doctor Profile"
                  className="w-full rounded"
                />
              </div>
              <div className="w-full">
                <MintButton
                  onClick={handleProfileChange}
                  text="프로필 사진"
                  text2="등록하기"
                  sizeW="w-full"
                  sizeH="h-15"
                  fontSize="text-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-8">
          <div className="w-full p-8 md:w-1/2">
            <div className="h-72">
              <div className="mb-4 text-xl">경력을 입력해주세요 !</div>
              <AddInput onClick={addCareer} id="career" />
              <hr className="m-4" />
              {careers.map((a, i) => (
                <DeleteContent
                  key={i}
                  content={a}
                  onClick={() => deleteCareer(i)}
                />
              ))}
            </div>
          </div>
          <div className="w-full p-8 md:w-1/2">
            <div className="h-72">
              <div className="mb-4 text-xl">학력을 입력해주세요 !</div>
              <AddInput onClick={addEdu} id="education" />
              <hr className="m-4" />
              {educations.map((a, i) => (
                <DeleteContent
                  key={i}
                  content={a}
                  onClick={() => deleteEducation(i)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-8">
          <span className="text-2xl">간단한 소갯말</span>
          <textarea
            className="w-full h-48 p-4 mt-4 text-xl border border-gray-400 rounded"
            placeholder="간단한 소갯말을 입력해주세요"
          ></textarea>
        </div>
        <div className="flex flex-col justify-center p-8">
          <div className="mb-4 text-2xl">전문 분야를 선택해주세요 !</div>
          <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded">
            전문 분야 선택 영역
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function AddInput({ id, onClick }) {
  return (
    <div className="flex items-center mb-2">
      <input
        type="text"
        className="w-full h-10 p-2 border rounded"
        placeholder={`${id == "career" ? "경력" : "학력"}을 입력해주세요`}
        id={id}
      />
      <button
        className="w-10 h-10 ml-2 text-2xl bg-green-300 rounded hover:bg-green-400"
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
}

function DeleteContent({ content, onClick }) {
  return (
    <div className="flex items-center mb-2">
      <span className="w-full h-10 p-2 bg-gray-200 border rounded">
        {content}
      </span>
      <button
        className="w-10 h-10 ml-2 text-2xl bg-red-400 rounded hover:bg-red-500"
        onClick={onClick}
      >
        -
      </button>
    </div>
  );
}
