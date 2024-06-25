import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import MainDoctorCard from "@/components/doctor/MainDoctorCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function MainSection2() {
  const [swiperRef, setSwiperRef] = useState(null);

  const doctors = [
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
    {
      profileUrl: "/doctor.png",
      name: "김철수",
      introduce: "밝은 에너지와 편안한 삶을",
    },
  ];

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
        <div className="flex flex-col items-center">
          <p className="m-2 text-3xl">나에게 딱 맞는 전문가</p>
          <p>공인 자격을 갖춘 검증된 전문가들이 여러분들을 기다리고 있어요</p>
        </div>
        <div className="relative">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={-600}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {doctors.map((doctor, i) => (
              <SwiperSlide key={i}>
                <MainDoctorCard
                  profileUrl={doctor.profileUrl}
                  introduce={doctor.introduce}
                  name={doctor.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
