import axios from "../axiosApi";

const baseUrl = "/review";
export const showMoreReview = (id, page) => {
  return axios.get(`${baseUrl}?id=${id}&page=${page}`).then((res) => res);
};
