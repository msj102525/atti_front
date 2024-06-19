import Header from "../common/Header";
import FeedNav from "@/components/feed/FeedNav";
import FeedSideBar from "@/components/feed/FeedSideBar";
import FeedWriteForm from "@/components/feed/FeedWriteForm";
import { useState } from "react";


export default function FeedWrite() {
    const [data, setData] = useState("");
    const getData = childData => {
        setData(childData);


    }

    return (
        <div>
            <div className="sticky top-0 z-50">
                <Header />
            </div>
            <div className="flex justify-center">
                <div className="border-solid border flex justify-between  w-[1536px] gap-x-10">
                    <div className="border-solid border flex-2 p-2">
                        <FeedSideBar />
                    </div>
                    <div className="border-solid border flex-1 p-2">
                        <div>
                            <FeedNav getData={getData} />
                        </div>
                        <div className="flex w-full justify-center p-8 z-[0]">
                            <FeedWriteForm category={data === "모든 사연" ? "일반 고민" : data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



