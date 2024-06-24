import React from 'react';

const unlink_res = await axios.post(
  KAKAO_UNLINK_URI,
  {
    target_id_type : "user_id",
    target_id : 659683531 //  해당 사용자 id(카카오 회원번호)
  }, 
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "KakaoAK " + KAKAO_ADMIN_KEY,
    },
  }
);

export default unlink_res;