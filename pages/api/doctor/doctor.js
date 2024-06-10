import axios from "../axiosApi";

const baseUrl = "/doctor";
export const showList = () => {
  return axios.get(baseUrl).then((res) => res);
};
