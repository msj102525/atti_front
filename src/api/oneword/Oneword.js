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
