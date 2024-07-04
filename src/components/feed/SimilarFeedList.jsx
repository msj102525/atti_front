import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/api/feed/feed";
import { searchSimilarFeeds } from "@/api/feed/feed";

export default function SimilarFeedList({ data, user }) {
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [similarFeeds, setSimilarFeeds] = useState([]);

    console.log(data);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resData = await searchSimilarFeeds(data.feedNum);
                if (resData.length > 0) {
                    setSimilarFeeds(resData);
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, [data]);


    return (
        <div className="p-10">
            <div className="flex justify-center">
                <div className="gap-24 columns-1 w-full">
                    <p className="pb-10 px-10 w-2/5 text-customBrown text-3xl relative after:content-[''] after:absolute after:bg-slate-500 after:block after:w-full after:h-[2px] after:left-10 after:bottom-[15px]">이 글과 유사한 글 보기</p>
                    {similarFeeds.map((feed, idx) => (
                        <div key={idx} className="border-[#001219] flex flex-col border min-w-full p-4 rounded-[40px] mb-4 cursor-pointer hover-grow">
                            <Link href={`/feed/${feed.feedNum}`}>
                                <div className="flex gap-2 text-m items-center text-gray-500 pb-2 min-w-96">
                                    <p>{feed.category}</p>
                                    <p>|</p>
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img className="block w-full" src={feed.feedWriterProfileUrl ? `${NEXT_PUBLIC_API_URL}` + feed.feedWriterProfileUrl : "/common/user/noProfile.png"} alt="userImg" />
                                    </div>
                                    <p>{feed.inPublic === "Y" ? feed.feedWriterId : "비공개"}</p>
                                    <p>{formatDate(feed.feedDate)}</p>
                                </div>
                                <div className="text-lg max-h-60 overflow-hidden line-clamp-[8] mb-4"
                                    dangerouslySetInnerHTML={{ __html: feed.feedContent }} />
                                <div className="flex gap-x-4">
                                    <div className="flex gap-1">
                                        <img src={feed.loginUserIsLiked ? "/feed/fillHeart.png" : "/feed/emptyHeart.png"} alt="" />
                                        {feed.likeCount}
                                    </div>
                                    <div className="flex gap-1">
                                        <img src={"/feed/comment.png"} alt="댓글" />
                                        {feed.replyCount}
                                    </div>
                                </div>
                                <div className={`${feed.dcomentExist ? "block" : "hidden"} border p-1 rounded-[20px] bg-customBrown2`}>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img className="block w-full" src={feed.docterImgUrl ? `${NEXT_PUBLIC_API_URL}` + feed.docterImgUrl : "/common/user/noProfile.png"} alt="userImg" />
                                        </div>
                                        <p>{feed.docterName}님의 전문답변</p>
                                    </div>
                                    <div className="text-lg max-h-60 overflow-hidden line-clamp-[3] mb-4" dangerouslySetInnerHTML={{ __html: feed.docterComent }} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}