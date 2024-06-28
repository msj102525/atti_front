import MainSection1 from "@/components/common/MainSection1";
import MainSection2 from "@/components/common/MainSection2";

export default function Container() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-screen-2xl pb-20">
        <MainSection1 />
        <MainSection2 />
      </div>
    </div>
  );
}
