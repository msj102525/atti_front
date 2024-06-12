import axios from '@/api/axiosApi';

export const getOnewordSubjectList = ({ page, size }) => {
    // 쿼리 파라미터를 사용하여 URL 생성
    const params = new URLSearchParams({
        page,
        size
    }).toString();

    console.log("getOnewordSubjectList : ");

    return axios.get(`/onewordsubject/list?${params}`)
        .then(res => {
            return res.data;
        });
}

export const writePost = (postData) =>{
    console.log("postData : ", postData);
    return axios.post("/notice", postData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

