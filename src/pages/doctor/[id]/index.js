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
import LottieAnimation from "@/components/common/animation/LottieAnimation";
import noReview from "@/components/animationData/noReview";

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
    localStorage.setItem("consultDoctorId", id);
    router.push("/pay/pay");
  };

  const moreReview = () => {
    if (!hasMoreReviews) {
      setReviewList((prevReviews) => [...prevReviews, bufferedReview]);
      setBufferedReview(null);
      setReviewValid(false);
    } else {
      showMoreReview(id, currentReviewPage).then((res) => {
        const resData = res.data;
        const responseList = resData.reviewList;
        if (resData.hasMoreReview) {
          const addList = [...responseList.slice(0, 3), bufferedReview];
          setBufferedReview(responseList[3]);
          setReviewList((prevReviews) => [...prevReviews, ...addList]);
          setCurrentReviewPage(currentReviewPage + 1);
        } else {
          setHasMoreReviews(false);
          if (responseList.length < 4) {
            const addList = [...responseList.slice(0, 3), bufferedReview];
            setBufferedReview(null);
            setReviewList((prevReviews) => [...prevReviews, ...addList]);
            setReviewValid(false);
          } else {
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
              setReviewList(initialReviews);
              setBufferedReview(null);
              setReviewValid(false);
            } else {
              setReviewList(initialReviews.slice(0, 3));
              setBufferedReview(initialReviews[3]);
              setReviewValid(true);
              setCurrentReviewPage(currentReviewPage + 1);
            }
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
      <div className="mx-auto w-[950px]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full p-5 md:w-1/2 md:p-10">
            <p className="text-xl md:text-2xl">{doctorComment}</p>
            <hr className="w-2/6 my-5 border-gray-800 border-3 md:my-10 md:border-4" />
            <p className="my-5 text-xl font-extrabold md:text-2xl">
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
            <hr className="w-2/6 my-5 border-gray-800 border-3 md:my-10 md:border-4" />
            <p className="text-xl font-extrabold md:text-2xl">
              {userName}님의 전문분야
            </p>
            <div className="flex flex-wrap mt-5">
              {tagList.map((tagName, index) => (
                <Tags key={index} name={tagName} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full pt-5 md:w-1/2 md:pt-0">
            <img src={profileUrl} className="w-auto h-[250px] md:h-[350px]" />
            <MintButton
              onClick={handleConsult}
              text="상담신청하기"
              sizeW="w-3/4 md:w-1/2"
              sizeH="h-12 md:h-1/6"
              fontSize="text-xl md:text-2xl"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <hr className="w-2/5 my-5 border border-gray-400" />
        </div>
        <div className="container px-4 py-6 mx-auto">
          <h3 className="my-5 text-xl font-extrabold md:text-2xl">
            {userName} 상담사님 후기
          </h3>
          {reviewList.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex justify-center w-full">
                <div className="w-full h-40 max-w-lg md:h-60">
                  <RatingDistribution
                    averageRating={averageRating}
                    ratingCounts={ratingCounts}
                  />
                </div>
              </div>
              {reviewList.map((review, index) => (
                <div key={index} className="flex justify-center">
                  <div className="w-full h-40 max-w-lg md:h-60">
                    <ReviewCard
                      userName={review.nickName}
                      starPoint={review.starPoint}
                      content={review.content}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span>아직 등록된 리뷰가 없습니다.....</span>
              <LottieAnimation animationData={noReview}></LottieAnimation>
            </div>
          )}
          {reviewValid && (
            <div className="flex justify-center h-12 mt-5 md:h-20 md:mt-10">
              <MintButton
                text="리뷰더보기"
                sizeW="w-1/2 md:w-1/4"
                sizeH="h-full"
                fontSize="text-lg md:text-2xl"
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
