// pages/api/naver/callback.js

import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const { code, state } = req.query;

    try {
        const tokenResponse = await axios.post('https://nid.naver.com/oauth2.0/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.NEXT_PUBLIC_API_NAVER_CLIENT_ID,
                client_secret: process.env.NAVER_CLIENT_SECRET,
                code,
                state,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userData = userResponse.data.response;
        const email = userData.email;

        // 백엔드 서버로 사용자 정보를 보내고 토큰을 발급받는 로직 추가
        const backendResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/naver/login`, { email });
        const { access, refresh, userId, userName, nickName, profileUrl, userType } = backendResponse.data;

        res.redirect(`/login/success?access=${access}&refresh=${refresh}&userId=${userId}&userName=${encodeURIComponent(userName)}&nickName=${nickName}&profileUrl=${profileUrl}&userType=${userType}`);
    } catch (error) {
        console.error('Error during Naver login callback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
