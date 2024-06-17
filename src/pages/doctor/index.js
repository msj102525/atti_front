import styles from "@/styles/doctor/doctorList.module.css";
import Link from "next/link";
import Header from "@/pages/common/Header";
import Footer from "@/pages/common/Footer";
import React, { useCallback, useEffect, useState } from "react";
import { showList, searchList } from "@/api/doctor/doctor";
import Pagination from "@/components/common/page";
import MintButton from "@/components/common/MintButton";

let tagList = [
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
  const [selectedTags, setSelectedTags] = useState([]); // 선택된 상황 태그 목록을 저장할 스테이트 추가
  const [maleValid, setMaleValid] = useState(false);
  const [femaleValid, setFemaleValid] = useState(false);
  const [doctorList, setDoctorList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호를 상태로 추가
  const [pageCount, setPageCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false); // 검색 중인지 여부를 나타내는 상태 추가
  const [keywordSearch, setKeywordSearch] = useState("");

  // 검색
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          selectedTags.length == 0 &&
          keyword.length == 0 &&
          gender.length == 0
        ) {
          const response = await showList(currentPage); // 현재 페이지 번호를 인자로 전달하여 데이터 가져오기
          setPageCount(response.data.pages);
          setDoctorList(response.data.doctors);
        } else {
          if (
            selectedTags.length == 0 &&
            keyword.trim().length == 0 &&
            gender.length == 0
          ) {
            alert("검색어를 입력해주세요! ");
            return;
          }
          const response = await searchList(
            currentPage,
            selectedTags,
            keywordSearch,
            gender
          );
          setPageCount(response.data.pages);
          setDoctorList(response.data.doctors);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // fetchData 함수를 호출하여 데이터를 가져옴
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
    setCurrentPage(selectedPage.selected); // 페이지 변경 시 현재 페이지 상태 업데이트
  };
  const handleSearchPageChange = (selectedPage) => {
    setSearchCurrentPage(selectedPage.selected);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      searchName();
    }
  };
  const changeGender = (e) => {
    if (e.target.value === "M") {
      setGender("M");
      setMaleValid(true);
      setFemaleValid(false);
    } else {
      setGender("F");
      setMaleValid(false);
      setFemaleValid(true);
    }
  };
  const handleKeywordChange = (event) => {
    // 입력 필드의 새 값으로 상태를 업데이트합니다.
    setKeyword(event.target.value);
  };

  // const handleInputChange = useCallback((event) => {
  //   setKeyword(event.target.value)
  // },[])

  // 태그 클릭 시 선택된 태그 목록을 업데이트하는 함수
  const handleTagClick = (tag) => {
    {
      setSelectedTags((prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((prevTag) => prevTag !== tag)
          : [...prevTags, tag]
      );
    }
  };
  const searchName = async () => {
    setKeywordSearch(keyword);
  };
  return (
    <div>
      <Header />
      <div className="mx-auto w-[1586px]">
        <div className={`${styles.mainContainer} flex justify-center mt-5`}>
          <div className="flex justify-center px-2">
            <div className={`${styles.searchArea} w-1/6`}>
              <div className={styles.searchBar}>
                <div className={styles.searchTagDiv}>
                  <p className="my-10 text-4xl font-thin">나의 상황</p>
                  {tagList[0].map((tag, index) => (
                    <SearchSituationTag
                      key={index}
                      name={tag}
                      handleClick={() => handleTagClick(tag)}
                      isSelected={selectedTags.includes(tag)}
                    />
                  ))}
                </div>
                <div className={styles.searchTagDiv}>
                  <p className="my-10 text-4xl font-thin">나의 증상</p>
                  {tagList[1].map((tag, index) => (
                    <SearchSymptomTag
                      key={index}
                      name={tag}
                      handleClick={() => handleTagClick(tag)}
                      isSelected={selectedTags.includes(tag)}
                    />
                  ))}
                </div>
                <div className={styles.checkGender}>
                  <h3 className="my-10 text-4xl font-thin">성별</h3>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="vue-checkbox-list"
                          type="checkbox"
                          value="M"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          onChange={changeGender}
                          checked={maleValid}
                        />
                        <label
                          htmlFor="vue-checkbox-list"
                          className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
                        >
                          남자
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="react-checkbox-list"
                          type="checkbox"
                          value="F"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          onChange={changeGender}
                          checked={femaleValid}
                        />
                        <label
                          htmlFor="react-checkbox-list"
                          className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
                        >
                          여자
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center h-48 mt-8">
                  <div>
                    <MintButton
                      onClick={resetSearchCondition}
                      text="검색조건 초기화"
                      sizeW="w-96"
                      sizeH="h-24"
                      fontSize="text-2xl"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row p-4">
                <div className="flex-auto ">
                  <input
                    className="w-full h-full border-2 border-gray-300rounded-lg"
                    type="text"
                    value={keyword}
                    placeholder="찾으시는 의사이름을 입력해주세요"
                    onChange={handleKeywordChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="flex-auto w-4" onClick={searchName}>
                  <img
                    className="block w-10 ml-10"
                    src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTUuOTcgMTcuMDMxYy0xLjQ3OSAxLjIzOC0zLjM4NCAxLjk4NS01LjQ2MSAxLjk4NS00LjY5NyAwLTguNTA5LTMuODEyLTguNTA5LTguNTA4czMuODEyLTguNTA4IDguNTA5LTguNTA4YzQuNjk1IDAgOC41MDggMy44MTIgOC41MDggOC41MDggMCAyLjA3OC0uNzQ3IDMuOTg0LTEuOTg1IDUuNDYxbDQuNzQ5IDQuNzVjLjE0Ni4xNDYuMjE5LjMzOC4yMTkuNTMxIDAgLjU4Ny0uNTM3Ljc1LS43NS43NS0uMTkyIDAtLjM4NC0uMDczLS41MzEtLjIyem0tNS40NjEtMTMuNTNjLTMuODY4IDAtNy4wMDcgMy4xNC03LjAwNyA3LjAwN3MzLjEzOSA3LjAwNyA3LjAwNyA3LjAwN2MzLjg2NiAwIDcuMDA3LTMuMTQgNy4wMDctNy4wMDdzLTMuMTQxLTcuMDA3LTcuMDA3LTcuMDA3eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.docorCardView} w-3/5`}>
              {doctorList && doctorList.length > 0 ? (
                doctorList.map((doctor) => (
                  <DoctorCard
                    key={doctor.userId} // 각 의사의 고유한 key 추가
                    id={doctor.userId}
                    name={doctor.userName}
                    comment={doctor.introduce}
                    address={doctor.hospitalName}
                    profileUrl="/doctor.png"
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center pt-20">
                  <img
                    src="/standingDoctor.png"
                    alt="No doctors found"
                    className="w-3/5"
                  />
                  <p className="mt-20 text-3xl">
                    조건을 만족하는 의사가 없어요 ㅠㅠ
                  </p>
                </div>
              )}
              <div className={styles.pageDiv}>
                {pageCount > 0 && !isSearching && (
                  <Pagination
                    pageCount={pageCount} // 페이지 수를 전달
                    onPageChange={handlePageChange} // 페이지 변경 핸들러 전달
                    currentPage={currentPage} // 현재 페이지 번호 전달
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function DoctorCard(props) {
  return (
    <div className={styles.doctorCard}>
      <div className={styles.doctorInfo}>
        <div className={styles.doctorName}>{props.name}</div>
        <div className={styles.doctorComment}>{props.comment}</div>
        <div className={styles.doctorAddress}>
          <img className={styles.locationLogo} src="/location.png" />
          {props.address}
        </div>
        <Link href={`/doctor/${props.id}`} className={styles.moveDetail}>
          <h3>전문가 프로필 보기 &gt; </h3>
        </Link>
      </div>
      <div className={styles.imageBox}>
        <img className={styles.profileImage} src={props.profileUrl} />
      </div>
    </div>
  );
}

function SearchSituationTag(props) {
  return (
    <div
      className={`${styles.tag} ${props.isSelected ? styles.selected : ""}`}
      onClick={props.handleClick}
    >
      {props.name}
    </div>
  );
}

function SearchSymptomTag(props) {
  return (
    <div
      className={`${styles.tag} ${props.isSelected ? styles.selected : ""}`}
      onClick={props.handleClick}
    >
      {props.name}
    </div>
  );
}
