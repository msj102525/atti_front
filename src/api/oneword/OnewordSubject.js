import axios from '@/api/axiosApi';

export const getOnewordSubjectList = ({ keyword, page, size }) => {
    // 쿼리 파라미터를 사용하여 URL 생성
    const params = new URLSearchParams({
        keyword,
        page,
        size
    }).toString();

    console.log("getOnewordSubjectList : ");

    return axios.get(`/onewordsubject/list?${params}`)
        .then(res => {
            return res.data;
        });
}

export const getOnewordSubjectListCount = ({keyword}) => {
    const params = new URLSearchParams({
        keyword
    }).toString();

    // 쿼리 파라미터를 사용하여 URL 생성
    return axios.get(`/onewordsubject/list/count?${params}`)
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

// 제목으로 검색
export const getSearchOwsjSubject = ({ keyword, page, size }) => {
    // 쿼리 파라미터를 사용하여 URL 생성
    const params = new URLSearchParams({
        keyword,
        page,
        size
    }).toString();

    console.log("getSearchOwsjSubject : ");

    return axios.get(`/onewordsubject/searchowsjsubject?${params}`)
        .then(res => {
            return res.data;
        });
}

// 제목으로 검색 건수
export const getSearchOwsjSubjectCount = ({ keyword }) => {
    // 쿼리 파라미터를 사용하여 URL 생성
    const params = new URLSearchParams({
        keyword
    }).toString();

    // 쿼리 파라미터를 사용하여 URL 생성
    return axios.get(`/onewordsubject/searchowsjsubject/count?${params}`)
        .then(res => {
            return res.data;
        });
}

export const insertOnewordSubject = (onewordsubjectData) =>{
    console.log("onewordsubjectData : ", onewordsubjectData);
    return axios.post("/onewordsubject", onewordsubjectData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

export const updateOnewordSubject = (onewordSubjectData) =>{
    console.log("postData : ", onewordSubjectData);
    return axios.put(`/onewordsubject/${onewordSubjectData.owsjNum}`, onewordSubjectData).then(res =>{
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