import Header from "@/pages/common/Header";
import PhilosopherSelect from "@/components/ai/PhilosopherSelect";
import TextBox from "@/components/ai/TextBox";
import { useEffect, useState } from "react";
import PhilosopherConsult from "@/components/ai/PhilosopherConsult";
import Footer from "../common/Footer";

export default function Ai() {
  let initialText = [
    "지금 당신의 그 고민",
    "과거 유명한 철학자도 비슷한 고민을 하지 않았을까요?",
    "그렇다면 그 고민에 대해 어떤 결론을 내렸을까요?",
  ];
  let secondText = [
    "편하게 말해보세요!",
    "여기서 말하는 고민은 누구에게도 들리지 않아요!",
  ];
  let thirdText = ["음성을 텍스트로 변환하고 있어요 !", "잠시만 기다려주세요!"];
  let fourthText = [
    "마음에 들지 않으면",
    "녹음버튼을 눌러 다시 녹음하거나",
    "텍스트를 수정해보세요!",
  ];
  let fifthText = ["잠시만 기다려주세요 !", "대답을 생성중이에요 !!!"];
  let sixthText = [
    "본인의 현재 감정이 어떤지 궁금하시다면",
    "아래 '내감정은?' 버튼을 눌러보세요 !",
  ];

  let GuideMessage = [
    initialText,
    secondText,
    thirdText,
    fourthText,
    fifthText,
    sixthText,
  ];

  const [textList, setTextList] = useState(initialText);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(null);
  const [isPhilosopherSelected, setIsPhilosopherSelected] = useState(false);
  const [messageSequence, setMessageSequence] = useState(0);

  useEffect(() => {
    setTextList(GuideMessage[messageSequence]);
  }, [messageSequence]);

  const handlePhilosopherSelect = (philosopher) => {
    setMessageSequence(1);
    setSelectedPhilosopher(philosopher);
    setIsPhilosopherSelected(true);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full min-h-screen py-10">
        <TextBox textList={textList} />
        {!isPhilosopherSelected ? (
          <PhilosopherSelect onSelectPhilosopher={handlePhilosopherSelect} />
        ) : (
          <PhilosopherConsult
            philosopher={selectedPhilosopher}
            setMessageSequence={setMessageSequence}
            messageSequence={messageSequence}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
