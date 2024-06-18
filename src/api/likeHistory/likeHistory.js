import axios from '../axiosApi';

export const postLike = (feedNum) => {

    console.log("AxiosPostLikeFeed : ", feedNum);
    return axios.post(`/feed/like?feed=${feedNum}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        });
}

