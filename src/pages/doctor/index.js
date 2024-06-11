import styles from "../../styles/doctor/doctorList.module.css";
import Link from "next/link";
import Header from "../common/Header";
import React, { useCallback, useEffect, useState } from "react";
import { userAgent } from "next/server";
import { showList } from "@/pages/api/doctor/doctor";

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
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await showList();
        console.log(JSON.stringify(response.data, null, 2));
        setDoctorList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // fetchData 함수를 호출하여 데이터를 가져옴
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 처음 렌더링될 때만 실행됨

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

  const handleInputChange = (event) => {
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
  return (
    <div>
      <Header />
      <div className={`${styles.mainContainer} flex justify-center`}>
        <div className="flex justify-center w-3/5 px-500">
          <div className={`${styles.searchArea} flex-2`}>
            <div className={styles.searchBar}>
              <div className={styles.searchTagDiv}>
                <p className="my-10 text-4xl font-thin">나의 상황</p>
                {tagList[0].map((tag, index) => (
                  <SearchSituationTag
                    key={index}
                    name={tag}
                    handleClick={() => handleTagClick(tag)} // 상황 태그 클릭 핸들러
                    isSelected={selectedTags.includes(tag)} // 선택 여부를 판단하여 스타일을 적용할 수 있도록 함
                  />
                ))}
              </div>
              <div className={styles.searchTagDiv}>
                <p className="my-10 text-4xl font-thin">나의 증상</p>
                {tagList[1].map((tag, index) => (
                  <SearchSymptomTag
                    key={index}
                    name={tag}
                    handleClick={() => handleTagClick(tag)} // 증상 태그 클릭 핸들러
                    isSelected={selectedTags.includes(tag)} // 선택 여부를 판단하여 스타일을 적용할 수 있도록 함
                  />
                ))}
              </div>
              <div className={styles.checkGender}>
                <h3 class="my-10 text-4xl font-thin">성별</h3>
                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input
                        id="vue-checkbox-list"
                        type="checkbox"
                        value="M"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onClick={changeGender}
                        checked={maleValid}
                      />
                      <label
                        for="vue-checkbox-list"
                        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        남자
                      </label>
                    </div>
                  </li>
                  <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input
                        id="react-checkbox-list"
                        type="checkbox"
                        value="F"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onClick={changeGender}
                        checked={femaleValid}
                      />
                      <label
                        for="react-checkbox-list"
                        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        여자
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-row p-1">
              <div className="flex-auto w-8">
                <img
                  className="block w-full"
                  src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTUuOTcgMTcuMDMxYy0xLjQ3OSAxLjIzOC0zLjM4NCAxLjk4NS01LjQ2MSAxLjk4NS00LjY5NyAwLTguNTA5LTMuODEyLTguNTA5LTguNTA4czMuODEyLTguNTA4IDguNTA5LTguNTA4YzQuNjk1IDAgOC41MDggMy44MTIgOC41MDggOC41MDggMCAyLjA3OC0uNzQ3IDMuOTg0LTEuOTg1IDUuNDYxbDQuNzQ5IDQuNzVjLjE0Ni4xNDYuMjE5LjMzOC4yMTkuNTMxIDAgLjU4Ny0uNTM3Ljc1LS43NS43NS0uMTkyIDAtLjM4NC0uMDczLS41MzEtLjIyem0tNS40NjEtMTMuNTNjLTMuODY4IDAtNy4wMDcgMy4xNC03LjAwNyA3LjAwN3MzLjEzOSA3LjAwNyA3LjAwNyA3LjAwN2MzLjg2NiAwIDcuMDA3LTMuMTQgNy4wMDctNy4wMDdzLTMuMTQxLTcuMDA3LTcuMDA3LTcuMDA3eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"
                />
              </div>
              <div className="flex-auto ">
                <input
                  className="w-full border-2 border-solid"
                  type="text"
                  value={keyword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.docorCardView} flex-1`}>
            {doctorList.map((doctor) => (
              <DoctorCard
                id={doctor.userId}
                name={doctor.userName}
                comment={doctor.introduce}
                address={doctor.hospitalName}
                profileUrl="/doctor.png"
              />
            ))}
          </div>
        </div>
      </div>
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
