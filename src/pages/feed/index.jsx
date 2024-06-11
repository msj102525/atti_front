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
                    <FeedList category={data} />
                </div>
            </div>
        </div>
    )
}