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

