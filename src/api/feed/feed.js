import axios from '../axiosApi';

export const postFeed = (postData) => {
    console.log("AxiosPostData : ", postData);
    // return axios.post("/feed",postData)
    // .then(res =>{
    //     console.log("res :", res);
    //     return res;
    // })
    // .catch(err => {
    //     console.error(err);
    // });
}

export const top5FeedContent = () => {
    return axios.get("/feed/top5")
    .then(res => {
        console.log(res);
        return res.data;
    })
    .catch(err => {
        console.error(err);
    });
}


