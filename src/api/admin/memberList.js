import axios from '@/api/axiosApi';
 
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

//정지리스트 뽑아오기

export const getSuspensionMemberList = ({ searchField , searchInput, page, size }) => {
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

    return axios.get(`/admin/suspensionMemberList?${params}`)
        .then(response => {
            return response.data;
        });
}



export const deleteMember = async (userId) => {
    const response = await axios.delete(`/admin/api/deletemembers/${userId}`);
    return response.data;
};

//정지해제(정지리스트상에서 삭제)
export const deleteSuspensionMember = async (suspensionNo) => {
    const response = await axios.delete(`/admin/api/deletesuspensionmembers/${suspensionNo}`);
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

export const suspendMember = async (suspensionData) => {
    try {
      const response = await axios.post(`/admin/api/suspendmembers`, suspensionData);
      return response.data;
    } catch (error) {
      console.error('Error suspending member:', error);
      throw error;
    }
  };