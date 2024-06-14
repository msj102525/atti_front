import Header from "../common/Header";
import FeedNav from "@/components/feed/FeedNav";
import FeedSideBar from "@/components/feed/FeedSideBar";
import FeedList from "@/components/feed/FeedList";
import { useState } from "react";

export default function Feed() {
    const [data, setData] = useState("");
    const getData = childData => {
        setData(childData);
    }

    return (
        <div>
            <div className="sticky top-0">
                <Header />
            </div>
            <div className="flex justify-center">
                <div className="border-solid border flex justify-between max-w-6xl max-w-screen-2xl">
                    <div className="border-solid border flex-2 p-2">
                        <FeedSideBar />
                    </div>
                    <div className="border-solid border flex-1">
                        <FeedNav getData={getData} />
                        <FeedList category={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}