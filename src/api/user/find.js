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
