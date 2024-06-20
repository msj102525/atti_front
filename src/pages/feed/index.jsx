import Header from "../common/Header";
import FeedNav from "@/components/feed/FeedNav";
import FeedSideBar from "@/components/feed/FeedSideBar";
import FeedList from "@/components/feed/FeedList";
import { useState } from "react";

export default function Feed() {
    const [data, setData] = useState({});

    console.log(data);

    const getData = ({ category, subCategory }) => {
        setData({ category, subCategory });
    }

    return (
        <div>
            <div className="sticky top-0">
                <Header />
            </div>
            <div className="flex justify-center">
                <div className="border-solid border flex justify-between  w-[1536px]">
                    <div className="border-solid border flex-2 p-2">
                        <FeedSideBar />
                    </div>
                    <div className="border-solid border flex-1">
                        <FeedNav getData={getData} />
                        <FeedList category={data.category} subCategory={data.subCategory} />
                    </div>
                </div>
            </div>
        </div>
    )
}
