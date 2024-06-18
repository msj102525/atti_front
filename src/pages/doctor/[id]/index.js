import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { showDetail } from "@/api/doctor/doctor";
import { showMoreReview } from "@/api/doctor/review";
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import ListView from "@/components/doctor/ListView";
import MintButton from "@/components/common/MintButton";
import RatingDistribution from "@/components/doctor/RatingDistribution";
import ReviewCard from "@/components/doctor/ReviewCard";
import Tags from "@/components/doctor/Tags";

export default function DoctorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [educationList, setEducationList] = useState([]);
  const [careerList, setCareerList] = useState([]);
  const [userName, setUserName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [tagList, setTagList] = useState([]);
  const [doctorComment, setDoctorComment] = useState("");
  const [averageRating, setAverageRating] = useState(0.0);
  const [ratingCounts, setRatingCounts] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [bufferedReview, setBufferedReview] = useState(null);
  const [reviewValid, setReviewValid] = useState(false);
  const [currentReviewPage, setCurrentReviewPage] = useState(0);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);

  const handleConsult = () => {
    console.log("hello");
  };

  const moreReview = () => {
    //Case1 ) hasMoreReview가 false 이지만 버퍼가 남아있다 .
    //그냥 버퍼를 출력하고 버튼을 비활성화
    console.log(hasMoreReviews);
    if (!hasMoreReviews) {
      console.log("그냥 버퍼를 출력하고 버튼을 비활성화");
      setReviewList((prevReviews) => [...prevReviews, bufferedReview]);
      setBufferedReview(null);
      setReviewValid(false);
      //Case2 ) hasMoreReview가 true ( 그리고 이게 true라면 버퍼는 남아있을 수 밖에없다.)
    } else {
      console.log("우선 다음 리뷰들 요청을 보내고 hasMoreReview를 확인한다.");
      console.log(currentReviewPage);
      //현재 상태 ? hasMoreReview가 true이고 버퍼가 남아있다.
      //우선 다음 리뷰들 요청을 보내고 hasMoreReview를 확인한다.
      showMoreReview(id, currentReviewPage).then((res) => {
        const resData = res.data;
        const responseList = resData.reviewList;
        console.log("리뷰가 남아있나요 ???" + resData.hasMoreReview);
        if (resData.hasMoreReview) {
          //Case2-1) 아직 다음 리뷰들이 남아있고 버퍼가 들어있는 상태
          //대답온 리뷰들중 3개와 버퍼를 합쳐서 ReviewList에 추가하고 버퍼 리뷰에 마지막 하나를 추가한다.
          console.log(
            "대답온 리뷰들중 3개와 버퍼를 합쳐서 ReviewList에 추가하고 버퍼 리뷰에 마지막 하나를 추가한다."
          );
          const addList = [...responseList.slice(0, 3), bufferedReview];
          setBufferedReview(responseList[3]);
          setReviewList((prevReviews) => [...prevReviews, ...addList]);
          setCurrentReviewPage(currentReviewPage + 1);
        } else {
          console.log("응답 리뷰가 돌아왔다. 근데 더이상 다음 리뷰는 없다 ..");
          console.log(responseList.length);
          //Case2-2) 응답 리뷰가 돌아왔다. 근데 더이상 다음 리뷰는 없다 .
          setHasMoreReviews(false); //일단 더이상 없다는걸 표시
          //지금 상태는 ? 버퍼가 들어가있다. 근데 다음 리뷰는 없다 더이상
          // 먼저 갯수를 확인해보자 .
          //Case2-2-1) 응답온 리뷰의 갯수가 4개 미만일 때
          //응답온 리뷰들과 버퍼를 합쳐서 리뷰리스트에 추가하고 버퍼를 비우고 버튼을 비활성화한다.
          if (responseList.length < 4) {
            console.log(
              "응답온 리뷰들과 버퍼를 합쳐서 리뷰리스트에 추가하고 버퍼를 비우고 버튼을 비활성화한다."
            );
            const addList = [...responseList.slice(0, 3), bufferedReview];
            setBufferedReview(null);
            setReviewList((prevReviews) => [...prevReviews, ...addList]);
            setReviewValid(false);
            //Case2-2-2) 응답온 리뷰의 갯수가 4개 일 때.
          } else {
            console.log("버퍼에 한개를 담고 그대로 출력");
            //버퍼에 한개를 담고 그대로 출력
            const addList = [...responseList.slice(0, 3), bufferedReview];
            setBufferedReview(responseList[3]);
            setReviewList((prevReviews) => [...prevReviews, ...addList]);
          }
        }
      });
    }
  };
  useEffect(() => {
    if (id) {
      showDetail(id, 0)
        .then((res) => {
          const doctor = res.data;
          if (doctor) {
            setEducationList(doctor.educations);
            setCareerList(doctor.careers);
            setUserName(doctor.userName);
            setProfileUrl("/doctor.png");
            setDoctorComment(doctor.introduce);
            setTagList(doctor.tags);
            setAverageRating(doctor.averageStarPoint);
            setRatingCounts(doctor.ratingCount);

            const initialReviews = doctor.reviews;

            if (initialReviews.length < 4) {
              // 초기 리뷰가 4개 미만일 때, 모든 리뷰를 출력하고 버튼을 비활성화
              console.log(
                "초기 리뷰가 4개 미만일 때, 모든 리뷰를 출력하고 버튼을 비활성화"
              );
              setReviewList(initialReviews);
              setBufferedReview(null);
              setReviewValid(false);
            } else {
              // 초기 리뷰가 4개 이상일 때, 첫 3개 리뷰를 표시하고, 나머지 1개를 buffer에 저장
              console.log(
                "초기 리뷰가 4개 이상일 때, 첫 3개 리뷰를 표시하고, 나머지 1개를 buffer에 저장"
              );
              setReviewList(initialReviews.slice(0, 3));
              setBufferedReview(initialReviews[3]);
              setReviewValid(true);
              setCurrentReviewPage(currentReviewPage + 1);
            }
            console.log(doctor);
            setHasMoreReviews(doctor.hasMoreReview);
          }
        })
        .catch((error) => {
          console.error("정보 불러오기 실패", error);
        });
    }
  }, [id]);

  return (
    <div>
      <Header />
      <div className="mx-auto w-[1300px]">
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
                return <Tags key={index} name={tagName} />;
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
        <div className="container px-4 py-8 mx-auto">
          <h3 className="m-10 text-2xl font-extrabold">
            {userName} 상담사님 후기
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center w-full">
              <div className="w-full max-w-xl h-60">
                <RatingDistribution
                  averageRating={averageRating}
                  ratingCounts={ratingCounts}
                />
              </div>
            </div>
            {reviewList.map((review, index) => (
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
          {reviewValid && (
            <div className="flex justify-center h-20 mt-10">
              <MintButton
                text="리뷰더보기"
                sizeW="w-1/4"
                sizeH="h-full"
                fontSize="text-3xl"
                onClick={moreReview}
                visible={reviewValid}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
