import axios from "../axiosApi";

const baseUrl = "/review";
export const showMoreReview = (id, page) => {
  return axios.get(`${baseUrl}?id=${id}&page=${page}`).then((res) => res);
};

export const showMyList = (page, order) => {
  return axios
    .get(`${baseUrl}/my?page=${page}&sortDir=${order}`)
    .then((res) => res);
};

export const updateReview = (review) => {
  return axios.put(`${baseUrl}`, review).then((res) => res);
};

export const deleteReview = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res);
};
