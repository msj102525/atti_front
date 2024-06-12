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

export const showDetail = (id) => {
  return axios.get(baseUrl + "/" + id).then((res) => res);
};
