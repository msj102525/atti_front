import axios from '/pages/api/admin/axiosApi';

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

export const getMemberList = async ({  }) => {
   
    const response = await axios.get('/admin/memberList', {
        params: {
            
        },
    });
    return response.data;

};

export const deleteMember = async (memberId) => {
    const response = await axios.delete(`/api/members/${memberId}`);
    return response.data;
};