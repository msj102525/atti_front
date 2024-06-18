import { useEffect } from "react";
import MintButton from "@/components/common/MintButton";

const KakaoAddress = ({
  address,
  setAddress,
  zonecode,
  setZonecode,
  extraAddress,
  setExtraAddress,
  detailAddress,
  setDetailAddress,
}) => {
  useEffect(() => {
    const handleScriptLoad = () => {
      if (window.daum && window.daum.Postcode) {
        console.log("Kakao Postcode API loaded successfully");
      }
    };

    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = handleScriptLoad;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openKakaoPostcode = () => {
    if (!window.daum || !window.daum.Postcode) {
      console.error("Kakao Postcode API is not loaded yet");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        const zonecode = data.zonecode;
        let extraAddr = "";

        if (data.addressType === "R") {
          if (data.bname !== "") extraAddr += data.bname;
          if (data.buildingName !== "")
            extraAddr +=
              extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
          extraAddr = extraAddr !== "" ? ` (${extraAddr})` : "";
        }

        setAddress(fullAddress);
        setZonecode(zonecode);
        setExtraAddress(extraAddr);
      },
    }).open();
  };

  return (
    <div className="mt-4">
      <label className="block mb-2 text-xl font-semibold">병원 주소</label>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={address}
          readOnly
          className="w-full p-2 mr-2 border border-gray-300 rounded"
          placeholder="주소를 입력하세요"
        />
        <MintButton
          onClick={openKakaoPostcode}
          text="주소 검색"
          sizeW="w-1/4"
          sizeH="h-10"
          fontSize="text-base"
        />
      </div>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={zonecode}
          readOnly
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="우편번호"
        />
      </div>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={extraAddress}
          readOnly
          className="w-1/2 p-2 mr-2 border border-gray-300 rounded"
          placeholder="상세 주소"
        />
        <input
          type="text"
          className="w-1/2 p-2 border border-gray-300 rounded"
          placeholder="나머지 주소를 입력하세요"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
      </div>
    </div>
  );
};

export default KakaoAddress;
