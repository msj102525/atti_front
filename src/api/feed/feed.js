import axios from '../axiosApi';

export const postFeed = async (postData) => {
    if(postData.category == "") postData.category = "일반 고민";
    
    console.log("AxiosPostData : ", postData);
    return await axios.post("/feed", postData)
        .then(res => {
            console.log("res :", res);
            return res;
        })
        .catch(err => {
            console.error(err);
        });
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

export const getFeedByFeedNum = async (feedNum) => {
    try {
        const response = await axios.get(`/feed/${feedNum}`);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



