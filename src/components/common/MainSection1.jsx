import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function MainSection1() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <div className="min-h-80 -solid -2 max-w-screen-2xl pb-10">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="min-h-80 bg-[#006D77] text-white">
                        <div className=" text-left p-20">
                            <p className='text-3xl pb-7'>심리상담 커뮤니티에 글을 적어보세요!</p>
                            <p className='pb-2'>심리상담 커뮤니티는 여러분의 이야기를 나누고, 조언을 받으며, 다른 사람들의 경험을 통해 배울 수 있는 좋은 공간입니다.</p>
                            <div className="flex leading-4">
                                <p>자신의 감정과 생각 나누기</p>
                                <div className="w-[16px] h-[16px]">
                                    <img className='block w-full' src="/common/main/gtArrow.png" alt="오른쪽화살표" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="min-h-80 bg-[#83C5BE] text-white">
                        <div className=" text-left p-20">
                            <p className='text-3xl pb-3'>다양한 분야의 전문가를 찾아보세요!</p>
                            <p>전문가 찾기를 통해 지식을 나누고 조언을 구할 수 있는 기회를 잡아보세요!</p>
                            <div className="flex leading-4">
                                <p>전문가 찾기를 통해 상담하기</p>
                                <div className="w-[16px] h-[16px]">
                                    <img className='block w-full' src="/common/main/gtArrow.png" alt="오른쪽화살표" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide><SwiperSlide>
                    <div className="min-h-80 bg-[#C0F6F9] text-white">
                        <div className=" text-left p-20">
                            <p className='text-3xl pb-3'>다양한 분야의 전문가를 찾아보세요!</p>
                            <p>심리상담 커뮤니티는 여러분의 이야기를 나누고, 조언을 받으며, 다른 사람들의 경험을 통해 배울 수 있는 좋은 공간입니다.</p>
                            <div className="flex leading-4">
                                <p>자신의 감정과 생각 나누기</p>
                                <div className="w-[16px] h-[16px]">
                                    <img className='block w-full' src="/common/main/gtArrow.png" alt="오른쪽화살표" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide><SwiperSlide>
                    <div className="min-h-80 bg-[#FFDDD2] text-white">
                        <div className=" text-left p-20">
                            <p className='text-3xl pb-3'>오늘의 한 줄</p>
                            <p>오늘 하루도 감정을 나눌 준비가 되어 있나요? 당신의 한 줄이 누군가에게는 큰 용기가 될 수 있습니다.</p>
                            <div className="flex leading-4">
                                <p>주제에 맞는 자신의 감정과 생각 나누기</p>
                                <div className="w-[16px] h-[16px]">
                                    <img className='block w-full' src="/common/main/gtArrow.png" alt="오른쪽화살표" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide><SwiperSlide>
                    <div className="min-h-80 bg-[#E29578] text-white">
                        <div className=" text-left p-20">
                            <p className='text-3xl pb-3'>AI 서비스를 활용해 보세요!</p>
                            <p>감정을 이해하고 조언을 받아보세요. AI가 당신을 위한 맞춤형 서비스를 제공합니다.</p>
                            <div className="flex leading-4">
                                <p>AI 서비스 이용해보기</p>
                                <div className="w-[16px] h-[16px]">
                                    <img className='block w-full' src="/common/main/gtArrow.png" alt="오른쪽화살표" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
}
