import MainSection1 from "@/components/common/MainSection1"
import MainSection2 from "@/components/common/MainSection2"

export default function Container() {
    return (
        <div className="flex justify-center w-full">
            <div className="max-w-screen-2xl w-full">
                <MainSection1 />
                <MainSection2 />
            </div>
        </div>
    )
}
