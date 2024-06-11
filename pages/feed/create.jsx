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

    console.log(`FeedIndex : ${data}`);
    
    return (
        <div>
            <Header />
            <div className="border-solid border flex justify-between">
                <div className="border-solid border flex-2">
                    <FeedSideBar />
                </div>
                <div className="border-solid border flex-1">
                    <FeedNav getData={getData} />
                    <div className="flex w-full justify-center p-8">
                        <FeedWriteForm category={data === "모든 사연" ? "일반 고민" : data} />
                    </div>
                </div>
            </div>
        </div>
    )
}



