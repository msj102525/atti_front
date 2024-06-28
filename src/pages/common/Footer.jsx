export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="w-full flex justify-center">
            <footer className="w-full min-h-40 max-w-screen-2xl ">
                <div className="p-0 mb-7.5">
                    <div className="w-full h-auto flex justify-center relative">
                        <div className="absolute left-0 top-0 w-full h-px bg-gray-400"></div>
                        <div className="absolute left-0 bottom-0 w-full h-px bg-gray-400"></div>
                        <div className="flex w-full max-w-screen-2xl justify-between">
                            <div className="flex-1 max-w-screen-lg p-2.5">
                                <ul className="flex justify-between">
                                    <li className="text-base p-1 text-gray-600 leading-7.5"><a href="#">서비스 이용약관</a></li>
                                    <li className="text-base p-1 text-black font-semibold leading-7.5"><a href="#">개인정보처리방침</a></li>
                                    <li className="text-base p-1 text-gray-600 leading-7.5"><a href="#">영상정보처리기기운영·관리방침</a></li>
                                    <li className="text-base p-1 text-gray-600 leading-7.5"><a href="#">이메일 무단수집 거부</a></li>
                                    <li className="text-base p-1 text-gray-600 leading-7.5"><a href="#">전자공고</a></li>
                                    <li className="text-base p-1 text-gray-600 leading-7.5"><a href="#">매장안내</a></li>
                                    <li className="text-base p-1 text-gray-600 leading-7.5"><a href="#">고객센터</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-screen-2xl mx-auto">
                        <div className="flex justify-between p-4 px-10">
                            <div>
                                <p className="text-base p-1 text-gray-600 leading-5">아띠 | 대표이사 : 남길현, 한지웅, 장세민, 김유리, 안정연, 문승종</p>
                                <p className="text-base p-1 text-gray-600 leading-5">서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)</p>
                                <p className="text-base p-1 text-gray-600 leading-5">사업자등록번호 : 123-45-67890 | 개인정보보호책임자 : 문승종</p>
                                <p className="text-base p-1 text-gray-600 leading-5">고객상담 1234-5678(사이트) | 123-456-789(제품 및 매장외)</p>
                            </div>
                            <div className="p-2.5">
                                <span onClick={scrollToTop} className="text-lg text-gray-600 cursor-pointer transition-all ease-in-out hover:text-customBrown">위로</span>
                            </div>
                        </div>
                        <div className="p-2.5">
                            <p className="text-xs text-gray-600">© copyright@ict.org &nbsp; 지능형 도우미 서비스 융합 웹 개발자과정</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
