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
            // console.log(res);
            return res.data;
        })
        .catch(err => {
            console.error(err);
        });
}

export const getListByCategory = async (category, page, size) => {
    try {
        if (category === "모든 사연" || category === "최신순") category = "";

        console.log("axios start", category, page, size);
        console.log("page : ", page)
        
        const response = await axios.get(`/feed?category=${category}&page=${page}&size=${size}`);
        
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



