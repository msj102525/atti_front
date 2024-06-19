
const baseUrl = "/api";

export const uploadProfilePhoto = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {

            throw new Error('파일 업로드 실패');
        }

        return await response.json();
    } catch (error) {
        console.error('업로드 오류:', error);
        throw error;
    }
};

export const updateProfilePhoto = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(baseUrl+'/update', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('파일 업데이트 실패');
        }

        return await response.json();
    } catch (error) {
        console.error('업데이트 오류:', error);
        throw error;
    }
};

export const deleteProfilePhoto = async () => {
    try {
        const response = await fetch(baseUrl+'/delete/', {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('파일 삭제 실패');
        }

        return await response.json();
    } catch (error) {
        console.error('삭제 오류:', error);
        throw error;
    }
};
