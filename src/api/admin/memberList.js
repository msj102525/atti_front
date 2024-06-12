import axios from '@/api/admin/axiosApi';
 
// export const getMemberList = async ({ searchField, page, size }) => {
   
//     const response = await axios.get('/admin/memberList', {
//         params: {
//             searchField,
//             page,
//             size,
//         },
//     });
//     //return response.data;

// };

// export const getMemberList = async ({ searchField, searchInput, page, size }) => {
   
//     const response = await axios.get('/admin/memberList', {
//         params: {
//             searchField,
//             searchInput,
//             page,
//             size
            
//         },
//     });
//     return response.data;

// };

export const getMemberList = ({ searchField , searchInput, page, size }) => {
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

    return axios.get(`/admin/memberList?${params}`)
        .then(response => {
            return response.data;
        });
}



export const deleteMember = async (userId) => {
    const response = await axios.delete(`/admin/api/deletemembers/${userId}`);
    return response.data;
};

export const updateMember = async (userId, userData) => {
    try {
        const response = await axios.put(`/admin/api/updatemembers/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating member:', error);
        throw error;
    }
};

