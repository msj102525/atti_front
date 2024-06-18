import axios from '../axiosApi';

export const postReply = (replyData) => {

    console.log("AxiosPostData : ", replyData);
    
    return axios.post("/reply", replyData)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        });
}

