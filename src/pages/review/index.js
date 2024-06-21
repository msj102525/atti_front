import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import ReviewCard from "@/components/doctor/ReviewCard";

export default function ConsultationHistory() {
  const consultations = [
    {
      id: 1,
      date: "2024-06-21",
      doctor: "Dr. John Doe",
      duration: 30,
      review: {
        userName: "김철수",
        starPoint: 5,
        content:
          "상담이 매우 유익했습니다. 의사분께서 친절하게 설명해주셨어요.",
      },
    },
    {
      id: 2,
      date: "2024-05-15",
      doctor: "Dr. Jane Smith",
      duration: 45,
      review: {
        userName: "박영희",
        starPoint: 4,
        content: "상담 내용이 구체적이고 도움이 많이 되었습니다.",
      },
    },
    {
      id: 3,
      date: "2024-04-10",
      doctor: "Dr. Sam Wilson",
      duration: 60,
      review: {
        userName: null, // 탈퇴한 회원
        starPoint: 3,
        content: "의사분이 친절하고 이해하기 쉽게 설명해주셨습니다.",
      },
    },
  ];

  return (
    <div>
      <Header />
      <div className="max-w-screen-lg p-4 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">상담 내역</h1>
        <div className="space-y-6">
          {consultations.map((consultation) => (
            <div
              key={consultation.id}
              className="flex flex-col p-4 border rounded-lg shadow-md md:flex-row md:justify-between"
            >
              <ReviewCard
                userName={consultation.review.userName}
                starPoint={consultation.review.starPoint}
                content={consultation.review.content}
              />
              <div className="flex flex-col items-start justify-center mt-4 md:ml-6 md:mt-0">
                <div className="mb-2 text-sm text-gray-500">
                  <strong>상담 날짜:</strong> {consultation.date}
                </div>
                <div className="mb-2 text-sm text-gray-500">
                  <strong>상담 시간:</strong> {consultation.duration} 분
                </div>
                <div className="text-sm text-gray-500">
                  <strong>상담한 의사:</strong> {consultation.doctor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
