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

export const getReplyList = async (feedNum) => {
    try {
        console.log("axios start", feedNum);

        const response = await axios.get(`/reply?feed=${feedNum}`);

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

