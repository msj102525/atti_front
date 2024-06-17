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

export const getOnewordSubjectDetail = (owsjNum) => {
    return axios.get(`/onewordsubject/onesjdetail/${owsjNum}`)
        .then(res => {
            console.log('Read successfully : ', res);
            console.log('Read successfully2 : ', res.data);
            return res.data;
        })
        .catch(error => {
																 
            console.error('Error : ', error);
            throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
        });
}

export const insertOnewordSubject = (onewordsubjectData) =>{
    console.log("onewordsubjectData : ", onewordsubjectData);
    return axios.post("/onewordsubject", onewordsubjectData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

export const updateOnewordSubject = (postData) =>{
    console.log("postData : ", postData);
    // return axios.put(`/onewordsubject/${owsjNum}`, postData).then(res =>{
    //     console.log("res :", res);
    //     return res;
    // })
    return axios.put(`/onewordsubject`, postData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

export const deleteOnewordSubject = (owsjNum) =>{
    console.log("owsjNum : ", owsjNum);
    return axios.delete(`/onewordsubject/${owsjNum}`, owsjNum).then(res =>{
        console.log("res :", res);
        return res;
    })
}