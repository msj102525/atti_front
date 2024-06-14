import React from "react";
import { useRouter } from "next/router";
import { showDetail } from "@/api/doctor/doctor";
import { useEffect, useState } from "react";
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import styles from "@/styles/doctor/doctorDetail.module.css";
import ListView from "@/components/doctor/ListView";
import MintButton from "@/components/common/MintButton";
import RatingDistribution from "@/components/doctor/RatingDistribution";
import ReviewCard from "@/components/doctor/ReviewCard";

const averageRating = 4.81;
const ratingCounts = {
  5: 143,
  4: 10,
  3: 1,
  2: 2,
  1: 0,
};

let reviews = [
  {
    content:
      "짧은 시간 안에 상황을 파악하고 감정적인 지원, 실질적인 조언을 해 주십니다.",
    starPoint: 4,
    nickName: "힘들어요",
  },
  {
    content:
      "힘든 시간을 보내는 동안 선생님과의 상담으로 인해 많은 힘을 얻을 수 있었어요.",
    starPoint: 5,
    nickName: "고구마",
  },
  {
    content: "따뜻한 공감과 객관적인 상황분석.",
    starPoint: 5,
    nickName: "MBTIT",
  },
  {
    content: "전반적으로 좋았습니다.",
    starPoint: 3,
    nickName: "밝은햇살",
  },
  {
    content: "긍정적인 에너지를 주셔서 감사합니다.",
    starPoint: 4,
    nickName: "행복한날",
  },
  {
    content: "실용적인 조언을 주셔서 많은 도움이 되었습니다.",
    starPoint: 4,
    nickName: "성실한조언자",
  },
  {
    content: "사용자7의 리뷰입니다.",
    starPoint: 3,
    nickName: "사용자7",
  },
];

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
  }, [id]);

  return (
    <div>
      <Header />
      <div className="mx-auto w-[1586px]">
        <div className="flex">
          <div className="w-1/2 m-10">
            <p className="text-3xl">{doctorComment}</p>
            <hr className="w-1/6 m-10 border-8 border-gray-800" />
            <p className="m-5 text-2xl font-extrabold">
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
        <hr className="border-gray-800 border-3" />
        <h3 className="text-2xl font-extrabold">{userName} 상담사님 후기</h3>
        <div className="container px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center w-full">
              <div className="w-full max-w-xl h-60">
                <RatingDistribution
                  averageRating={averageRating}
                  ratingCounts={ratingCounts}
                />
              </div>
            </div>
            {reviews.map((review, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-xl h-60">
                  <ReviewCard
                    userName={review.nickName}
                    starPoint={review.starPoint}
                    content={review.content}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
