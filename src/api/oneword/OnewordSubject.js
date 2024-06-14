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
    axios.get(`/onewordsubject/onesjdetail/${owsjNum}`).then(response => {
        // console.log('Read count incremented successfully', response);
        console.log('Read successfully : ', response);
    }).catch(error => {
        // console.error('Error incrementing read count', error);
        console.error('Error : ', error);
    });
}

export const insertOnewordSubject = (onewordsubjectData) =>{
    console.log("onewordsubjectData : ", onewordsubjectData);
    return axios.post("/onewordsubject", onewordsubjectData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

export const updateOnewordSubject = (owsjNum, postData) =>{
    console.log("postData : ", postData);
    return axios.put(`/onewordsubject/${owsjNum}`, postData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

export const deleteOnewordSubject = (owsjNum) =>{
    console.log("owsjNum : ", owsjNum);
    return axios.put("/onewordsubject", owsjNum).then(res =>{
        console.log("res :", res);
        return res;
    })
}