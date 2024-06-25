import axios from "../axiosApi";

const baseUrl = "/doctor";

export const showList = (page) => {
  return axios.get(baseUrl + "?page=" + page).then((res) => res);
};

export const searchList = (
  currentPage,
  selectedTags,
  keywordSearch,
  gender
) => {
  const searchUrl = `/doctor/search?currentPage=${currentPage}&selectedTags=${selectedTags}&keyword=${keywordSearch}&gender=${gender}`;
  return axios.get(searchUrl).then((res) => res);
};

export const showDetail = (id, page) => {
  return axios.get(`${baseUrl}/${id}?page=${page}`).then((res) => res);
};

export const getDoctorMypageData = () => {
  return axios.get(baseUrl + "/mypage").then((res) => res);
};

export const showMainTop10 = () => {
  return axios.get(baseUrl + "/main").then((res) => res);
};

// 메일 전송 함수
export const sendCodeToEmail = async (email, code, name) => {
  try {
    const response = await axios.post(baseUrl + "/mail", {
      email: email,
      code: code,
      doctorName: name,
    });
    if (response.status === 200) {
      console.log("Email sent successfully:", response.data);
    } else {
      console.error("Failed to send email:", response.data);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
