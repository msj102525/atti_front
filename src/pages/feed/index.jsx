import Header from "../common/Header";
import FeedNav from "@/components/feed/FeedNav";
import FeedSideBar from "@/components/feed/FeedSideBar";
import FeedList from "@/components/feed/FeedList";
import { useState } from "react";
import { authStore } from "../stores/authStore";

export default function Feed() {
    const [data, setData] = useState({});

    const user = {
        userId: authStore.userId,
        userProfileUrl: authStore.userProfileUrl
    }

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
                        <FeedNav user={user} getData={getData} />
                        <FeedList user={user} category={data.category} subCategory={data.subCategory} />
                    </div>
                </div>
            </div>
        </div>
    )
}
