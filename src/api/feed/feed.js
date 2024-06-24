import axios from '../axiosApi';
import flaskAxios from "axios";

export const postFeed = (postData) => {
    if (postData.category == "") postData.category = "일반 고민";
    

    console.log("AxiosPostData : ", postData);
    return axios.post("/feed", postData)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        });
}

export const updateFeed = (postData) => {

    console.log("AxiosPostData : ", postData);

    return axios.put("/feed", postData)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        });
}

export const deleteFeedByFeedNum = (feedNum) => {

    console.log("AxiosPostData : ", feedNum);

    return axios.delete(`/feed/${feedNum}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        });
}

export const top5FeedContent = () => {
    return axios.get("/feed/top5")
        .then(res => {
            // console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.error(err);
        });
}

export const getFeedListByCategory = async (category, page, size, subCategory, searchData) => {
    try {
        if (category === "모든 사연" || category === "최신순") category = "";

        console.log("axios start");
        console.log("Category:", category);
        console.log("Page:", page);
        console.log("Size:", size);
        console.log("SubCategory:", subCategory);
        console.log("Search Data:", searchData);
        console.log("Search Data:", typeof(searchData));

        const response = await axios.get(`/feed?category=${category}&page=${page}&size=${size}&subCategory=${subCategory}&searchData=${searchData}`);
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

export const searchSimilarFeeds = async (feedNum) => {
    console.log("Axios flask", feedNum);
    try {
        const response = await flaskAxios.get(`http://127.0.0.1:5000/feed/similar/${feedNum}`);
        console.log(response);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const formatDate = (feedDate) => {
    const currentDate = new Date();
    const dateToCompare = new Date(feedDate);

    const timeDiff = Math.abs(currentDate - dateToCompare);
    const minuteDiff = Math.floor(timeDiff / (1000 * 60));

    if (minuteDiff < 1) {
        return '방금';
    } else if (minuteDiff < 60) {
        return `${minuteDiff}분 전`;
    } else {
        const hourDiff = Math.floor(minuteDiff / 60);

        if (hourDiff < 24 && currentDate.getDate() === dateToCompare.getDate()) {
            return `${hourDiff}시간 전`;
        } else {
            const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const dateToCompareOnly = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth(), dateToCompare.getDate());

            const dayDiff = Math.floor((currentDateOnly - dateToCompareOnly) / (1000 * 60 * 60 * 24));

            if (dayDiff === 0) {
                return '오늘';
            } else if (dayDiff === 1) {
                return '하루 전';
            } else if (dayDiff === 2) {
                return '이틀 전';
            } else if (dayDiff === 3) {
                return '사흘 전';
            } else if (dayDiff === 4) {
                return '나흘 전';
            } else if (dayDiff === 5) {
                return '닷새 전';
            } else if (dayDiff === 6) {
                return '엿새 전';
            } else if (dayDiff === 7) {
                return '이레 전';
            } else {
                return `${dayDiff}일 전`;
            }
        }
    }
};





