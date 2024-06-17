import { useRouter } from "next/router";
import PhilosopherCard from "./PhilosopherCard";

export default function PhilosopherSelect({ onSelectPhilosopher }) {
  const philosophers = [
    {
      name: "소크라테스",
      description: [
        "사람이 진실한 길을 사랑하기 어렵다는 사람이다.",
        "바르게 살아야 한다면, 세속을 포기하고 참된 것을 찾아야 한다.",
        "내가 보이고 싶은 대로 행동하라.",
      ],
      model: "socrates",
      introduce: "진정한 지혜는 자신의 무지를 아는 것에서 시작된다.",
    },
    {
      name: "데카르트",
      description: [
        "분노나 불같이 노하는 사람은 자신의 패배를 자초하는 사람과 같다.",
        "신뢰가 있으면 공감과 감동을 얻는다. 신뢰를 얻지 못한 사람은 장기적으로 성공할 수 있는 기회가 없다.",
      ],
      model: "descartes",
      introduce: [
        "모든 것을 의심하라",
        "그 속에서 진리와 나의 존재를 찾으리라.",
      ],
    },
    {
      name: "아리스토텔레스",
      description: [
        "전체는 부분의 합보다 크다.",
        "교육의 목적은 몸과 지내게 만드는 것이다.",
        "친구는 나 자신을 위한 두번째 몸이다.",
      ],
      model: "aristotle",
      introduce: "덕은 지식과 실천의 조화 속에서 완성된다.",
    },
    {
      name: "쇼펜하우어",
      description: [
        "당신의 인식이 왜곡되지 않으려면 경험을 통해 지식을 넓혀라.",
        "폭우를 방관하면 자신이 흠뻑 젖을 것이다.",
        "우리가 가지고 있는 것은 일시적인 만족을 줄 뿐 영원하지 않다.",
      ],
      model: "schopenhauer",
      introduce: ["삶은 고통이지만,", "그 고통 속에서 진정한 지혜가 탄생한다."],
    },
    {
      name: "공자",
      description: [
        "어리석은 자와 마찰을 피할 수 없다.",
        "지나친 욕심과 집착은 해롭다.",
        "군자의 도를 지키는 사람은 존경을 받을 것이다.",
      ],
      model: "confucius",
      introduce: "군자는 작은 이익을 추구하지 않고 큰 덕을 이룬다.",
    },
    {
      name: "플라톤",
      description: [
        "필요없는 욕심이다.",
        "행복을 사랑하는 것이 아니라 행복한 사람을 만들어야 한다.",
        "사람은 그들의 가장 중요한 부분이다.",
      ],
      model: "plato",
      introduce: [
        "이상적인 세상은 우리의 상상 속에 존재하며",
        "그곳에서 진정한 정의를 찾는다.",
      ],
    },
  ];

  return (
    <div className="grid w-full max-w-screen-xl grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-2 lg:grid-cols-3">
      {philosophers.map((philosopher, index) => (
        <div
          key={index}
          className="flex justify-center cursor-pointer"
          onClick={() => onSelectPhilosopher(philosopher)}
        >
          <div className="flex items-center p-4 transition duration-200 ease-in-out bg-teal-400 border-4 border-black rounded-lg h-[500px] w-80 hover:bg-teal-500 hover:opacity-90 active:bg-teal-600 active:opacity-80">
            <PhilosopherCard
              name={philosopher.name}
              description={philosopher.description}
              imgUrl={philosopher.imgUrl}
              model={philosopher.model}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
