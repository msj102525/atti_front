const KAKAO_API_HOST = "https://kapi.kakao.com"; // Kakao API Host
const ADMIN_KEY = process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY; // '관리자 키'

const unlinkKakaoAccount = async (userId) => {
  try {
    const response = await fetch(`${KAKAO_API_HOST}/v1/user/unlink`, {
      method: 'POST',
      headers: {
        'Authorization': `KakaoAK ${ADMIN_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: new URLSearchParams({
        target_id_type: 'user_id',
        target_id: userId
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('연결 끊기 성공:', data);
      return true;
    } else {
      const errorData = await response.json();
      console.error('연결 끊기 실패:', errorData);
      return false;
    }
  } catch (error) {
    console.error('연결 끊기 오류:', error);
    return false;
  }
};

export default unlinkKakaoAccount;
