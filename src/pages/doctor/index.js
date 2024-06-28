import Link from "next/link";
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import React, { useEffect, useState } from "react";
import { showList, searchList } from "@/api/doctor/doctor";
import Pagination from "@/components/common/page";
import MintButton from "@/components/common/MintButton";
import MapForDoctor from "@/components/doctor/MapForDoctor";

const tagList = [
  [
    "결혼/육아",
    "대인관계",
    "직장",
    "이별/이혼",
    "가족",
    "자아/성격",
    "정신건강",
    "성추행",
    "외모",
    "학업/고시",
  ],
  [
    "우울",
    "스트레스",
    "화병",
    "공황",
    "불면",
    "자존감",
    "강박",
    "충동/폭력",
    "트라우마",
    "조울증",
  ],
];

export default function DoctorList() {
  const [gender, setGender] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [maleValid, setMaleValid] = useState(false);
  const [femaleValid, setFemaleValid] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [hospitalName, sethospitalName] = useState("");
  const [hospitalPhoto, sethospitalPhoto] = useState("");
  const [mapPosition, setMapPosition] = useState(null);
  const [mapCoords, setMapCoords] = useState({
    latitude: null,
    longitude: null,
  });
  const [isMapVisible, setIsMapVisible] = useState(false);
  let mapTimer = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          selectedTags.length === 0 &&
          keyword.length === 0 &&
          gender.length === 0
            ? await showList(currentPage)
            : await searchList(
                currentPage,
                selectedTags,
                keywordSearch,
                gender
              );

        setPageCount(response.data.pages);
        setDoctorList(response.data.doctors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, selectedTags, gender, keywordSearch]);

  const resetSearchCondition = () => {
    setKeyword("");
    setKeywordSearch("");
    setGender("");
    setMaleValid(false);
    setFemaleValid(false);
    setSelectedTags([]);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setKeywordSearch(keyword);
    }
  };

  const changeGender = (e) => {
    const isMale = e.target.value === "M";
    setGender(isMale ? "M" : "F");
    setMaleValid(isMale);
    setFemaleValid(!isMale);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((prevTag) => prevTag !== tag)
        : [...prevTags, tag]
    );
  };

  const showMap = (event, latitude, longitude, hospitalPhoto, hospitalName) => {
    if (mapTimer) {
      clearTimeout(mapTimer);
    }
    const rect = event.target.getBoundingClientRect();
    const mapHeight = 130;
    const offset = 300;

    setMapCoords({ latitude, longitude });
    setMapPosition({ top: rect.top - mapHeight, left: rect.left + offset });
    setIsMapVisible(true);
    sethospitalName(hospitalName);
    sethospitalPhoto(hospitalPhoto);
  };

  const closeMap = () => {
    mapTimer = setTimeout(() => {
      setIsMapVisible(false);
    }, 300); // 마우스가 0.3초간 떠난 후 지도를 숨김
  };

  return (
    <div>
      <Header />
      <div className="mx-auto w-[1000px] mt-8">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center px-4 ">
            <div className="flex justify-center">
              <div className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
                <div className="p-2 mb-4 bg-gray-100 rounded-lg shadow-inner">
                  <p className="mb-2 text-lg font-semibold text-center">
                    나의 상황
                  </p>
                  <div className="flex flex-wrap justify-center">
                    {tagList[0].map((tag, index) => (
                      <SearchTag
                        key={index}
                        name={tag}
                        handleClick={() => handleTagClick(tag)}
                        isSelected={selectedTags.includes(tag)}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-2 mb-4 bg-gray-100 rounded-lg shadow-inner">
                  <p className="mb-2 text-lg font-semibold text-center">
                    나의 증상
                  </p>
                  <div className="flex flex-wrap justify-center">
                    {tagList[1].map((tag, index) => (
                      <SearchTag
                        key={index}
                        name={tag}
                        handleClick={() => handleTagClick(tag)}
                        isSelected={selectedTags.includes(tag)}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg shadow-inner">
                  <h3 className="mb-2 text-lg font-semibold text-center">
                    성별
                  </h3>
                  <ul className="flex flex-col items-center">
                    <li className="flex items-center mb-1">
                      <input
                        id="male-checkbox"
                        type="checkbox"
                        value="M"
                        className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        onChange={changeGender}
                        checked={maleValid}
                      />
                      <label htmlFor="male-checkbox" className="text-sm">
                        남자
                      </label>
                    </li>
                    <li className="flex items-center mb-1">
                      <input
                        id="female-checkbox"
                        type="checkbox"
                        value="F"
                        className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        onChange={changeGender}
                        checked={femaleValid}
                      />
                      <label htmlFor="female-checkbox" className="text-sm">
                        여자
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center my-4">
                  <MintButton
                    onClick={resetSearchCondition}
                    text="검색조건 초기화"
                    sizeW="w-28"
                    sizeH="h-8"
                    fontSize="text-xs"
                  />
                </div>
                <div className="flex mt-2">
                  <input
                    className="flex-grow w-3/4 h-8 p-1 text-xs border-2 border-gray-300 rounded-lg"
                    type="text"
                    value={keyword}
                    placeholder="의사이름을 입력해주세요"
                    onChange={handleKeywordChange}
                    onKeyDown={handleKeyDown}
                  />
                  <button className="flex items-center justify-center w-10 h-8 ml-2 text-gray-600 bg-gray-100 rounded-lg">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTUuOTcgMTcuMDMxYy0xLjQ3OSAxLjIzOC0zLjM4NCAxLjk4NS01LjQ2MSAxLjk4NS00LjY5NyAwLTguNTA5LTMuODEyLTguNTA5LTguNTA4czMuODEyLTguNTA4IDguNTA5LTguNTA4YzQuNjk1IDAgOC41MDggMy44MTIgOC41MDggOC41MDggMCAyLjA3OC0uNzQ3IDMuOTg0LTEuOTg1IDUuNDYxbDQuNzQ5IDQuNzVjLjE0Ni4xNDYuMjE5LjMzOC4yMTkuNTMxIDAgLjU4Ny0uNTM3Ljc1LS43NS43NS0uMTkyIDAtLjM4NC0uMDczLS41MzEtLjIyem0tNS40NjEtMTMuNTNjLTMuODY4IDAtNy4wMDcgMy4xNC03LjAwNyA3LjAwN3MzLjEzOSA3LjAwNyA3LjAwNyA3LjAwN2MzLjg2NiAwIDcuMDA3LTMuMTQgNy4wMDctNy4wMDdzLTMuMTQxLTcuMDA3LTcuMDA3LTcuMDA3eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"
                      alt="search"
                    />
                  </button>
                </div>
              </div>
              <div className="w-2/3 ml-4">
                {doctorList && doctorList.length > 0 ? (
                  doctorList.map((doctor) => (
                    <DoctorCard
                      key={doctor.userId}
                      id={doctor.userId}
                      name={doctor.userName}
                      comment={doctor.introduce}
                      address={doctor.hospitalName}
                      latitude={doctor.latitude}
                      longitude={doctor.longitude}
                      hospitalPhoto={doctor.hospitalPhotoUrl}
                      hospitalName={doctor.hospitalName}
                      profileUrl={doctor.profileUrl}
                      showMap={showMap}
                      closeMap={closeMap}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full pt-10">
                    <img
                      src="/standingDoctor.png"
                      alt="No doctors found"
                      className="w-80"
                    />
                    <p className="mt-5 text-lg">
                      조건을 만족하는 의사가 없어요 ㅠㅠ
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              {pageCount > 0 && !isSearching && (
                <Pagination
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isMapVisible && (
        <div
          className="absolute z-10"
          style={{ top: `${mapPosition.top}px`, left: `${mapPosition.left}px` }}
          onMouseEnter={() => clearTimeout(mapTimer)}
          onMouseLeave={closeMap}
        >
          <MapForDoctor
            latitude={mapCoords.latitude}
            longitude={mapCoords.longitude}
            hospitalName={hospitalName}
            hospitalPhoto={hospitalPhoto}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

function DoctorCard(props) {
  const serverImage = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="flex justify-between p-4 mb-4 bg-white border rounded-lg shadow-md">
      <div className="flex flex-col justify-between flex-grow p-4">
        <div className="text-lg font-bold">{props.name}</div>
        <div className="mb-2 text-sm">{props.comment}</div>
        <div className="flex items-center mb-2">
          <img className="w-4 h-4 mr-2" src="/location.png" alt="Location" />
          <div
            className="w-1/4"
            onMouseEnter={(event) =>
              props.showMap(
                event,
                props.latitude,
                props.longitude,
                props.hospitalPhoto,
                props.hospitalName
              )
            }
            onMouseLeave={props.closeMap}
          >
            <span className="text-sm">{props.address}</span>
          </div>
        </div>
        <Link
          href={`/doctor/${props.id}`}
          className="mt-2 text-sm text-blue-500"
        >
          전문가 프로필 보기 &gt;
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <img
          className="object-cover w-24 h-24 rounded-lg"
          src={
            props.profileUrl ? serverImage + props.profileUrl : "/doctor.png"
          }
          alt="Doctor"
        />
      </div>
    </div>
  );
}

function SearchTag(props) {
  return (
    <div
      className={`inline-block px-3 py-1 m-1 text-sm border rounded-full cursor-pointer ${
        props.isSelected
          ? "bg-gray-400 border-gray-700"
          : "bg-gray-100 border-gray-300"
      }`}
      onClick={props.handleClick}
    >
      {props.name}
    </div>
  );
}
