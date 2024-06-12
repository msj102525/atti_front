// next/router : 현재 경로의 정보를 들고 올 수 있는 모듈
import { useRouter } from "next/router";
import { showDetail } from "@/api/doctor/doctor";
import { useEffect, useState } from "react";
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import styles from "@/styles/doctor/doctorDetail.module.css";
import ListView from "@/components/doctor/ListView";
import MintButton from "@/components/common/MintButton";

export default function DoctorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [educationList, setEducationList] = useState([]);
  const [careerList, setCareerList] = useState([]);
  const [userName, setUserName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [tagList, setTagList] = useState([]);
  const [doctorComment, setDoctorComment] = useState("");

  const handleConsult = () => {
    console.log("hello");
  };
  useEffect(() => {
    if (id) {
      showDetail(id)
        .then((res) => {
          const doctor = res.data.doctor;

          if (doctor) {
            const educations = doctor.educations
              ? doctor.educations.map((item) => item.education)
              : [];
            const careers = doctor.careers
              ? doctor.careers.map((item) => item.career)
              : [];
            const tags = doctor.tags ? doctor.tags.map((item) => item.tag) : [];

            setEducationList(educations);
            setCareerList(careers);
            setUserName(doctor.user?.userName || ""); // optional chaining 사용
            setProfileUrl("/doctor.png" || "");
            setDoctorComment(doctor.introduce || "");
            setTagList(tags);
          }
        })
        .catch((error) => {
          console.error("정보불러오기 실패", error);
        });
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="mx-auto w-[1586px]">
        <div className="flex">
          <div className="w-1/2 m-10">
            <p className="text-3xl">{doctorComment}</p>
            <hr className="w-1/6 m-10 border-8 border-gray-800" />
            <p className="text-2xl font-extrabold">
              {userName} 상담사님의 간단한 소개
            </p>
            <ListView
              list={careerList}
              title="경력"
              iconUrl={"/careerBag.png"}
            />
            <ListView
              list={educationList}
              title="학력"
              iconUrl={"/graduateHat.png"}
            />
            <hr className="w-1/6 m-10 border-8 border-gray-800" />
            <p className="text-2xl font-extrabold">{userName}님의 전문분야</p>
            <div className="flex mt-5">
              {tagList.map((tagName, index) => {
                return <Tag key={index} name={tagName} />;
              })}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 pt-0">
            <img src={profileUrl} className="w-auto h-3/4" />
            <MintButton
              onClick={handleConsult}
              text="상담신청하기"
              sizeW="w-1/2"
              sizeH="h-1/6"
              fontSize="text-3xl"
            />
          </div>
        </div>
        <div className="review"></div>
      </div>
      <Footer />
    </div>
  );
}

function Tag(props) {
  return (
    <div className="inline-block px-4 py-2 m-2 text-sm text-gray-700 bg-gray-200 rounded-lg">
      {props.name}
    </div>
  );
}
