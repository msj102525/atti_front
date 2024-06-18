import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../common/Header";
import FeedSideBar from "@/components/feed/FeedSideBar";
import FeedDetail from "@/components/feed/FeedDetail";
import { getFeedByFeedNum } from "@/api/feed/feed";
import ReplyWirteForm from "@/components/reply/ReplyWriteForm";
import { jwtDecode } from "jwt-decode";

export default function Feed() {
    const [data, setData] = useState(null);
    const path = usePathname();
    // const [payload, setPayload] = useState(null);
    // console.log(payload);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         try {
    //             const decoded = jwtDecode(token);
    //             setPayload(decoded);
    //         } catch (error) {
    //             console.error('Invalid token', error);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!path) return;

            const feedNum = path.substring(6);
            try {
                const res = await getFeedByFeedNum(feedNum);
                console.log(res);
                setData(res);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [path]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="sticky top-0">
                <Header />
            </div>
            <div className="flex justify-center">
                <div className="border-solid border flex justify-between max-w-6xl max-w-screen-2xl gap-x-10">
                    <div className="border-solid border flex-2 p-2">
                        <FeedSideBar />
                    </div>
                    <div className="border-solid border flex-1">
                        <FeedDetail data={data} />
                        <ReplyWirteForm data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}
