import React, { useEffect, useState } from "react";
import Header from "@/pages/common/header";
import Footer from "@/pages/common/footer";
import MintButton from "@/components/common/MintButton";
import KakaoAddress from "@/components/doctor/KakaoAddress";

export default function DoctorUpdate() {
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [careers, setCareers] = useState([]);
  const [educations, setEducations] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [profileUrl, setProfileUrl] = useState("");
  const handleProfileChange = () => {
    console.log("프로필 수정");
  };
  const updateDoctor = () => {};
  const tagList = [
    [
      "결혼/육아",
      "대인관계",
      "직장",
      "이별/이혼",
      "가족",
      "자아/성격",
      "정신건강",
      "성추행",
      "외모",
      "학업/고시",
    ],
    [
      "우울",
      "스트레스",
      "화병",
      "공황",
      "불면",
      "자존감",
      "강박",
      "충동/폭력",
      "트라우마",
      "조울증",
    ],
  ];

  useEffect(() => {
    const tempUserId = localStorage.getItem("userId");
    setUserId(tempUserId);
    const userType = localStorage.getItem("userType");
    if (!tempUserId) {
      router.push("/login");
      return;
    }
    if (userType !== "D") {
      alert("권한이 없습니다 !");
      router.push("/");
    }
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("사용자 데이터를 가져오는데 실패했습니다:", error);
      }
    };
    fetchDoctorData();
  }, []);
  //경력, 학력 관리 함수---------------------------------------
  const addEdu = () => {
    const educationInput = document.getElementById("education");
    if (educationInput && educationInput.value.trim() !== "") {
      if (educations.length < 5) {
        const originEdu = [...educations];
        originEdu.push(educationInput.value.trim());
        setEducations(originEdu);
        educationInput.value = "";
      } else {
        alert("최대 5개의 학력만 추가할 수 있습니다.");
      }
    }
  };

  const addCareer = () => {
    const careerInput = document.getElementById("career");
    if (careerInput && careerInput.value.trim() !== "") {
      if (careers.length < 5) {
        const originCareer = [...careers];
        originCareer.push(careerInput.value.trim());
        setCareers(originCareer);
        careerInput.value = "";
      } else {
        alert("최대 5개의 경력만 추가할 수 있습니다.");
      }
    }
  };

  const deleteEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const deleteCareer = (index) => {
    setCareers(careers.filter((_, i) => i !== index));
  };
  //---------------------------------------------------------
  //태그 관리함수 --------------------------------------
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };
  //---------------------------------------------------------
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
              <AddInput
                onClick={addCareer}
                id="career"
                disabled={careers.length >= 5}
              />
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
              <AddInput
                onClick={addEdu}
                id="education"
                disabled={educations.length >= 5}
              />
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
          <div className="flex justify-center h-auto p-4 border border-gray-400 rounded">
            <div className="flex flex-col w-full m-2 rounded">
              <div className="m-2 text-xl text-center">상황별</div>
              <div className="flex flex-wrap justify-center gap-2">
                {tagList[0].map((tag, i) => (
                  <Tag
                    key={i}
                    name={tag}
                    selected={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    onRemove={() => removeTag(tag)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full h-auto m-2 rounded">
              <div className="m-2 text-xl text-center">증상별</div>
              <div className="flex flex-wrap justify-center gap-2">
                {tagList[1].map((tag, i) => (
                  <Tag
                    key={i}
                    name={tag}
                    selected={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    onRemove={() => removeTag(tag)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="h-48 p-8 mt-8 overflow-auto border border-gray-400 rounded">
            <div className="mb-2 text-xl">선택된 태그</div>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, i) => (
                <div
                  key={i}
                  className="inline-block px-3 py-1 m-1 text-sm text-black bg-gray-300 rounded-full"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center m-12">
          <MintButton
            onClick={updateDoctor}
            sizeW="w-48"
            sizeH="h-12"
            text="변경사항 저장"
            fontSize="text-xl"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Tag({ name, selected, onClick, onRemove }) {
  return (
    <div
      className={`relative px-3 py-1 m-1 text-sm bg-gray-200 rounded-full shadow-md cursor-pointer
        ${selected ? "border-2 border-black" : ""}
      `}
      onClick={onClick}
    >
      {name}
      {selected && (
        <span
          className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          X
        </span>
      )}
    </div>
  );
}

function AddInput({ id, onClick, disabled }) {
  return (
    <div className="flex items-center mb-2">
      <input
        type="text"
        className="w-full h-10 p-2 border rounded"
        placeholder={`${id === "career" ? "경력" : "학력"}을 입력해주세요`}
        id={id}
        disabled={disabled}
      />
      <button
        className={`w-10 h-10 ml-2 text-2xl ${
          disabled ? "bg-gray-300" : "bg-green-300"
        } rounded ${disabled ? "cursor-not-allowed" : "hover:bg-green-400"}`}
        onClick={onClick}
        disabled={disabled}
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
