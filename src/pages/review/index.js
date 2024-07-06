import React from "react";
import { useState, useEffect } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import ConsultCard from "@/components/review/ConsultCard";
import Pagination from "@/components/common/page";
import { showMyList } from "@/api/doctor/review";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ConsultationHistory() {
  const [reviewInfoList, setReviewInfoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [orderByDateDesc, setOrderByDateDesc] = useState(true);
  const serverImage = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      let order;
      try {
        if (orderByDateDesc) {
          order = "DESC";
        } else {
          order = "ASC";
        }
        const response = await showMyList(currentPage, order);
        console.log(response.data.myReviews);
        setPageCount(response.data.totalPage);
        setReviewInfoList(response.data.myReviews);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, orderByDateDesc]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const handleOrder = () => {
    setCurrentPage(0);
    setOrderByDateDesc(!orderByDateDesc);
  };

  return (
    <div>
      <Header />
      <div className="max-w-screen-lg p-4 mx-auto">
        <h1 className="m-8 text-4xl font-bold">내가 쓴 리뷰</h1>
        <div className="flex justify-end mr-8">
          {orderByDateDesc ? (
            <button
              className="p-2 text-lg bg-gray-300 rounded-lg"
              onClick={handleOrder}
            >
              날짜순 <i className="fas fa-arrow-down"></i>
            </button>
          ) : (
            <button
              className="p-2 text-lg bg-gray-300 rounded-lg"
              onClick={handleOrder}
            >
              날짜순 <i className="fas fa-arrow-up"></i>
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <div className="w-full">
            {reviewInfoList.map((reviewInfo, i) => (
              <ConsultCard
                key={`${reviewInfo.id}-${currentPage}`}
                doctorId={reviewInfo.doctorId}
                doctor={reviewInfo.doctor}
                profileUrl={serverImage + reviewInfo.profileUrl}
                writeDate={reviewInfo.writeDate}
                starPoint={reviewInfo.starPoint}
                content={reviewInfo.content}
                reviewId={reviewInfo.id}
                setReviewInfoList={setReviewInfoList}
                reviewInfoList={reviewInfoList}
              />
            ))}
          </div>
        </div>
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
      <Footer />
    </div>
  );
}
