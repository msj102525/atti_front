import axios from "../axiosApi"; // axios 인스턴스를 임포트

const baseUrl = "/inquiry"; // 기본 URL 설정

// 문의사항 리스트 가져오기
export const getInquiryList = async (page, size = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/inquiryList`, {
            params: {
                page: page,
                size: size,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 검색
export const searchInquiries = async (formData) => {
    try {
        const response = await axios.get(`${baseUrl}/search`, {
            params: formData,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 문의사항 상세 정보 가져오기
export const getInquiryDetail = async (inquiryNo) => {
    try {
        const response = await axios.get(`${baseUrl}/inquiryDetail/${inquiryNo}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 문의사항 수정
export const updateInquiry = async (inquiryNo, inquiryData) => {
    try {
        await axios.put(`${baseUrl}/inquiryUpdate/${inquiryNo}`, inquiryData);
    } catch (error) {
        throw error;
    }
};

// 문의사항 등록
export const createInquiry = async (formData) => {
    try {
        const response = await axios.post(`${baseUrl}/create`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 문의사항 삭제
export const deleteInquiry = async (userId) => {
    try {
        const response = await axios.delete(`${baseUrl}/inquiryDelete/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
