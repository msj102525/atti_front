import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NavButton({ userType }) {
  const router = useRouter();
  const [buttonMessage, setButtonMessage] = useState();
  useEffect(() => {
    console.log(userType);
    if (userType == "D") {
      setButtonMessage("의사정보 수정");
    } else if (userType == "U") {
      setButtonMessage("상담 내역");
    } else {
      setButtonMessage("");
    }
  }, []);
  const handleButtonClick = () => {
    if (userType == "D") {
      router.push("/doctor/mypage");
    } else if (userType == "U") {
      router.push("/review");
    } else {
      router.push("/");
    }
  };

  return (
    <button className="my-2" onClick={handleButtonClick}>
      {buttonMessage}
    </button>
  );
}
