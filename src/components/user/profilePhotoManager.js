const baseUrl = "/file";

export const uploadProfile = async (file, userId) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);

        const response = await fetch(baseUrl + '/upload', {
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

export const deleteProfilePhoto = async (userId) => {
    try {
        const response = await fetch(baseUrl + '/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
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
