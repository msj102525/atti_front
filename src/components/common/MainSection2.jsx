import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import MainDoctorCard from "@/components/doctor/MainDoctorCard";
import { showMainTop10 } from "@/api/doctor/doctor";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

export default function MainSection2() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await showMainTop10();
        setDoctors(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative bg-white">
      <div className="h-24"></div>
      <div className="absolute w-96 h-96 top-[-90px] right-12">
        <img
          src="/doctor/consult.png"
          className="object-contain object-center w-full h-full"
        />
      </div>
      <div className="flex flex-col p-8 bg-gray-100">
        <div className="flex flex-col items-center my-4">
          <p className="m-2 text-3xl">나에게 딱 맞는 전문가</p>
          <p>공인 자격을 갖춘 검증된 전문가들이 여러분들을 기다리고 있어요</p>
        </div>
        <div className="relative">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={5}
            centeredSlides={true}
            spaceBetween={100}
            loop={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
          >
            {doctors.map((doctor, i) => (
              <SwiperSlide key={i}>
                <MainDoctorCard
                  profileUrl={doctor.profileUrl}
                  introduce={doctor.introduce}
                  name={doctor.userName}
                  averageStarPoint={doctor.averageStarPoint}
                  doctorId={doctor.doctorId}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
