import axios from "../axiosApi";

const baseUrl = "/users";

export const UserIdFind = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/userIdfind`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const sendTempPassword = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/passwordReset`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const verifyTempPassword = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/verifyTempPassword`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
//비밀번호 수정
export const changePassword = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/changePassword`, data);
        return response;
    } catch (error) {
        throw error;
    }
};