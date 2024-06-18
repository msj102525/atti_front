import MainSection1 from "@/components/common/MainSection1"
import MainSection2 from "@/components/common/MainSection2"



export default function Container() {
    return (
        <div className="flex justify-center">
            <div className="w-[1536px]">
                <MainSection1 />
                <MainSection2 />
            </div>
        </div>
    )
}