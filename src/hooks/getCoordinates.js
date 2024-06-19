import axios from "axios";

const KAKAO_API_KEY = "6be9b685b13eabb98ee8c6a93216bbb8"; // 발급받은 API 키로 대체

export const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json`,
      {
        params: {
          query: address,
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    if (response.data.documents.length > 0) {
      const { x, y } = response.data.documents[0].address;
      return { latitude: parseFloat(y), longitude: parseFloat(x) };
    } else {
      console.error("주소를 찾을 수 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("카카오 주소 검색 API 요청 실패:", error);
    return null;
  }
};
