import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/pages/common/header";
import Footer from "@/pages/common/footer";
import MintButton from "@/components/common/MintButton";
import KakaoAddress from "@/components/doctor/KakaoAddress";
import { getDoctorMypageData, updateDoctorProfile } from "@/api/doctor/doctor"; // 업데이트 API 임포트
import { useRouter } from "next/router";
import FileUploadButton from "@/components/doctor/fileUploadButton";
import Modal from "@/components/common/Modal";
import { getCoordinatesFromAddress } from "../../../hooks/getCoordinates";

export default function DoctorUpdate() {
  const [userId, setUserId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [careers, setCareers] = useState([]);
  const [originalCareers, setOriginalCareers] = useState([]);
  const [educations, setEducations] = useState([]);
  const [originalEducations, setOriginalEducations] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [originalTags, setOriginalTags] = useState([]);

  const [hospitalFileName, setHospitalFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // 추가된 상태

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    content: "",
    redirectTo: "",
  });

  const router = useRouter();

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
    // 테스트 코드 --------------------------------------------------------
    let tempUserId = "user003";
    let userType = "D";
    // const tempUserId = localStorage.getItem("userId");
    // setUserId(tempUserId);
    // const userType = localStorage.getItem("userType");
    // setUserType(userType);
    //---------------------------------------------------------

    if (!tempUserId) {
      setModalMessage({
        title: "로그인 필요",
        content: "로그인 페이지로 이동합니다.",
        redirectTo: "/login",
      });
      setIsModalOpen(true);
      return;
    }

    if (userType !== "D") {
      setModalMessage({
        title: "권한 오류",
        content: "권한이 없습니다. 메인 페이지로 이동합니다.",
        redirectTo: "/",
      });
      setIsModalOpen(true);
      return;
    }

    const fetchDoctorData = async () => {
      try {
        const res = await getDoctorMypageData();
        const response = res.data;
        setAddress(response.address);
        setZonecode(response.zonecode);
        setExtraAddress(response.extraAddress);
        setDetailAddress(response.detailAddress);
        setCareers(response.careers);
        setOriginalCareers(response.careers);
        setEducations(response.educations);
        setOriginalEducations(response.educations);
        setSelectedTags(response.selectedTags);
        setOriginalTags(response.selectedTags);
        setHospitalFileName(response.hospitalFileName);
        setHospitalName(response.hospitalName);
        setHospitalPhone(response.hospitalPhone);
        setIntroduce(response.introduce);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchDoctorData();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (modalMessage.redirectTo) {
      router.push(modalMessage.redirectTo);
    }
  };

  // 이미지 파일 선택 및 미리보기
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHospitalFileName(URL.createObjectURL(file)); // 미리보기용 URL
      setSelectedFile(file); // 업로드할 파일 저장
    }
  };

  // 병원 정보와 이미지를 함께 저장
  const updateDoctor = async () => {
    // if (!userId) {
    //   alert("사용자 정보가 없습니다.");
    //   return;
    // }
    const coordinates = await getCoordinatesFromAddress(address);

    //이미 조회된 정보가 프론트에 있으므로, 삭제할거 추가할거 리스트로 전달
    const addCareerList = careers.filter(
      (item) => !originalCareers.includes(item)
    );
    const deleteCareerList = originalCareers.filter(
      (item) => !careers.includes(item)
    );
    const addEducationList = educations.filter(
      (item) => !originalEducations.includes(item)
    );
    const deleteEducationList = originalEducations.filter(
      (item) => !educations.includes(item)
    );
    const addTagList = selectedTags.filter(
      (item) => !originalTags.includes(item)
    );
    const deleteTagList = originalTags.filter(
      (item) => !selectedTags.includes(item)
    );
    const latitude = parseFloat(coordinates.latitude.toFixed(6));
    const longitude = parseFloat(coordinates.longitude.toFixed(6));
    const doctorData = {
      hospitalName,
      introduce,
      hospitalPhone,
      address,
      zonecode,
      latitude,
      longitude,
      extraAddress,
      detailAddress,
      addCareerList,
      deleteCareerList,
      addEducationList,
      deleteEducationList,
      addTagList,
      deleteTagList,
    };

    // FormData 객체 생성
    const formData = new FormData();

    // JSON 데이터를 Blob으로 감싸서 FormData에 추가
    formData.append(
      "doctorData",
      new Blob([JSON.stringify(doctorData)], { type: "application/json" })
    );
    if (selectedFile) {
      formData.append("hospitalImage", selectedFile); // 이미지 파일 추가
    }
    try {
      const response = await updateDoctorProfile(formData);
      if (response.status === 200) {
        setModalMessage({
          title: "수정되었습니다 !",
          content: "메인페이지로 이동합니다.",
          redirectTo: "/",
        });
        setIsModalOpen(true);
        return;
      }
    } catch (error) {
      console.error("병원 정보 업데이트 오류:", error);
    }
  };

  // 경력, 학력 관리 함수들 ---------------------------------------
  const addEdu = () => {
    const educationInput = document.getElementById("education");
    if (educationInput && educationInput.value.trim() !== "") {
      if (educations.length < 5) {
        setEducations([...educations, educationInput.value.trim()]);
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
        setCareers([...careers, careerInput.value.trim()]);
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
  // 태그 관리 함수 --------------------------------------
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
          <div className="mt-8 ml-8 text-3xl">병원정보</div>
          <div className="flex flex-wrap mt-8">
            <div className="w-full p-8 md:w-2/3">
              <div className="w-full mb-4">
                <label className="block mb-2 text-xl">병원 이름</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="병원 이름을 입력해주세요"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
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
                  value={hospitalPhone}
                  onChange={(e) => setHospitalPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full p-8 md:w-1/3">
              <FileUploadButton
                onChange={handleImageChange}
                onReset={() => setHospitalFileName(null)}
                hospitalFileName={hospitalFileName}
              />
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
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
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
          <div className="mt-6 text-2xl">선택된 태그</div>
          <div className="h-48 p-8 mt-8 overflow-auto border border-gray-400 rounded">
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
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalMessage.title}
        content={modalMessage.content}
        imgUrl="/doctor/pleaseLoginDoctorImage.png"
      />
    </div>
  );
}

// Tag 컴포넌트
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

// AddInput 컴포넌트
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

// DeleteContent 컴포넌트
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
