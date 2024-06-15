import Header from "@/pages/common/header";
import PhilosopherSelect from "@/components/ai/PhilosopherSelect";
import TextBox from "@/components/ai/TextBox";
import { useState } from "react";
import PhilosopherConsult from "@/components/ai/PhilosopherConsult";

export default function Ai() {
    let initialText = ["지금 당신의 그 고민", "과거 유명한 철학자도 비슷한 고민을 하지 않았을까요?","그렇다면 그 고민에 대해 어떤 결론을 내렸을까요?"];
    let secondText = ["편하게 말해보세요!", "여기서 말하는 고민은 누구에게도 들리지 않아요!"];
    const [textList, setTextList] = useState(initialText);
    const [selectedPhilosopher, setSelectedPhilosopher] = useState(null);
    const [isPhilosopherSelected, setIsPhilosopherSelected] = useState(false);

    const handlePhilosopherSelect = (philosopher) => {
        setTextList(secondText);
        setSelectedPhilosopher(philosopher);
        setIsPhilosopherSelected(true);
    };

    return (
        <div>
            <Header />
            <div className="min-h-screen w-full flex flex-col items-center py-10">
                <TextBox textList={textList} />
                {!isPhilosopherSelected ? (
                    <PhilosopherSelect onSelectPhilosopher={handlePhilosopherSelect} />
                ) : (
                    <PhilosopherConsult philosopher={selectedPhilosopher} />
                )}
            </div>
        </div>
    );
}
