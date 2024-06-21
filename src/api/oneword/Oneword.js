import axios from '@/api/axiosApi';

export const getOnewordList = ({ keyword, page, size }) => {
    // 쿼리 파라미터를 사용하여 URL 생성
    const params = new URLSearchParams({
        keyword,
        page,
        size
    }).toString();

    console.log("getOnewordList : ");

    return axios.get(`/oneword/searchoneword?${params}`)
        .then(res => {
            return res.data;
        });
}


// 등록
export const insertOneword = (onewordData) =>{
    console.log("onewordData : ", onewordData);
    return axios.post("/oneword", onewordData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

// 수정
export const updateOneword = (onewordData) =>{
    console.log("postData : ", onewordData);
    return axios.put(`/oneword/${onewordData.owNum}`, onewordData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

// 삭제
export const deleteOneword = (owsjNum) =>{
    console.log("owsjNum : ", owsjNum);
    return axios.delete(`/oneword/${owsjNum}`, owsjNum).then(res =>{
        console.log("res :", res);
        return res;
    })
}
