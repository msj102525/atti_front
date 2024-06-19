import axios from '@/api/axiosApi';

// 게시판 관리 

// 커뮤니티(admin ver.) ***************************************

export const getCommunityAdminVersionList = ({ searchField , searchInput, page, size }) => {
    // 쿼리 파라미터를 사용하여 URL 생성
    // if (!searchField) {
    //     searchField = 'userId';
    // }
    const params = new URLSearchParams({
            searchField,
            searchInput,
            page,
            size
    }).toString();

    return axios.get(`/admin/communityAdminVersionList?${params}`)
        .then(response => {
            return response.data;
        });
}


export const deleteCommunityAdminVersion = async (feedNum) => {
    const response = await axios.delete(`/admin/api/deletecommunityAdminVersion/${feedNum}`);
    return response.data;
};

// ******************************

// 공지사항(admin ver.) ******************************


export const getNoticeAdminVersionList = ({ searchField , searchInput, page, size }) => {
    // 쿼리 파라미터를 사용하여 URL 생성
    // if (!searchField) {
    //     searchField = 'userId';
    // }
    const params = new URLSearchParams({
            searchField,
            searchInput,
            page,
            size
    }).toString();

    return axios.get(`/admin/noticeAdminVersionList?${params}`)
        .then(response => {
            return response.data;
        });
}


export const deleteNoticeAdminVersion = async (boardNum) => {
    const response = await axios.delete(`/admin/api/deletenoticeAdminVersion/${boardNum}`);
    return response.data;
};



// *******************************************


