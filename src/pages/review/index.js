import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import ConsultCard from "@/components/review/ConsultCard";

export default function ConsultationHistory() {
  const consultations = [
    {
      doctorId: 1,
      doctor: "Dr. John Doe",
      profileUrl: "/doctor.png",
      review: {
        reviewId: 1,
        date: "2024-06-23",
        starPoint: 5,
        content:
          "상담이 매우 유익했습니다. 의사분께서 친절하게 설명해주셨어요.",
      },
    },
    {
      doctorId: 2,
      doctor: "Dr. Jane Smith",
      profileUrl: "doctor.png",
      review: {
        reviewId: 2,
        date: "2024-06-24",
        starPoint: 4,
        content:
          "상담이 매우 유익했어요. 친절하게 설명해주셨고, 많은 도움이 되었습니다.",
      },
    },
    {
      doctorId: 3,
      doctor: "Dr. Emily Johnson",
      profileUrl: "doctor.png",
      review: {
        reviewId: 3,
        date: "2024-06-22",
        starPoint: 3,
        content: "상담은 괜찮았지만, 시간이 조금 부족했던 것 같아요.",
      },
    },
    {
      doctorId: 4,
      doctor: "Dr. Michael Brown",
      profileUrl: "doctor.png",
      review: {
        reviewId: 4,
        date: "2024-06-21",
        starPoint: 5,
        content:
          "의사분께서 매우 친절하고 전문가답게 상담해주셔서 만족스러웠습니다.",
      },
    },
    {
      doctorId: 5,
      doctor: "Dr. Lisa White",
      profileUrl: "doctor.png",
      review: {
        reviewId: 5,
        date: "2024-06-20",
        starPoint: 4,
        content: "전문적이고 유익한 상담이었습니다. 다음에 또 방문하고 싶어요.",
      },
    },
  ];

  return (
    <div>
      <Header />
      <div className="max-w-screen-lg p-4 mx-auto">
        <h1 className="m-8 text-4xl font-bold">내가 쓴 리뷰</h1>
        {consultations.map((consult, i) => (
          <ConsultCard
            doctorId={consult.doctorId}
            doctor={consult.doctor}
            profileUrl={consult.profileUrl}
            writeDate={consult.review.date}
            starPoint={consult.review.starPoint}
            content={consult.review.content}
            reviewId={consult.review.reviewId}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
