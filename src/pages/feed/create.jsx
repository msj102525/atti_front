import Header from "../common/Header";
import FeedNav from "@/components/feed/FeedNav";
import FeedSideBar from "@/components/feed/FeedSideBar";
import FeedWriteForm from "@/components/feed/FeedWriteForm";
import { useState } from "react";
import { authStore } from "../stores/authStore";


export default function FeedWrite() {
    const [data, setData] = useState({});
    const [searchData, setSearchData] = useState("");

    const user = {
        userId: authStore.userId,
        userProfileUrl: authStore.userProfileUrl
    }


    const getData = ({ category, subCategory }) => {
        setData({ category, subCategory });
    }

    const getSearchData = (searchData) => {
        setSearchData(searchData);
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
                            <FeedNav user={user} getData={getData} getSearchData={getSearchData} />
                        </div>
                        <div className="flex w-full justify-center p-8 z-[0]">
                            <FeedWriteForm user={user} category={data.category === "모든 사연" ? "일반 고민" : data.category} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



