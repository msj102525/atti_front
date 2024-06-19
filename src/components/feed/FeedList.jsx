import { getListByCategory } from "@/api/feed/feed";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/api/feed/feed";

export default function FeedList({ category }) {
    const [feedData, setFeedData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const elementRef = useRef(null);
    const size = 10;

    useEffect(() => {
        if (page === 0) return;

        const fetchMoreData = async () => {
            await getListByCategory(category, page, size)
                .then(res => {
                    setFeedData(prevFeedData => [...prevFeedData, ...res]);
                    setHasMore(res.length === size);
                })
                .catch(error => {
                    console.error("Error fetching more data:", error);
                })
        };
        fetchMoreData();
    }, [page]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const firstData = await getListByCategory(category, 0, 10);
                setPage(0);
                setFeedData(firstData);
                setHasMore(firstData.length === size);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [category]);

    const fetchMoreItems = async () => {
        console.log("page", page)
        setPage(value => value + 1);
    };

    const onIntersection = (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasMore) {
            fetchMoreItems();
        }

    };

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);

        //elementRef가 현재 존재하면 observer로 해당 요소를 관찰.
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        // 컴포넌트가 언마운트되거나 더 이상 관찰할 필요가 없을 때(observer를 해제할 때)반환.
        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [hasMore]);



    return (
        <div className="p-10">
            <div className="flex justify-center">
                <div className="gap-24 columns-2">
                    {feedData.map((feed, idx) => (
                        <div key={idx} className="flex flex-col border max-w-md p-4 rounded-[40px] mb-4 cursor-pointer">
                            <Link href={`feed/${feed.feedNum}`}>
                                <div className="flex gap-2 text-m items-center text-gray-500 pb-2 min-w-96">
                                    <p>{feed.category}</p>
                                    <p>|</p>
                                    <div className="border w-10 h-10 rounded-full overflow-hidden">
                                        {/* <img className="block w-full" src={feed.feedWriterProfileUrl} alt="userImg" /> */}
                                        <img className="block w-full" src={"#"} alt="userImg" />
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
                                <div className={`${feed.dcomentExist ? "block" : "hidden"} border p-1 rounded-[20px] bg-cyan-100`}>
                                    <div className="flex items-center">
                                        <div className="border w-10 h-10 rounded-full overflow-hidden">
                                            {/* <img className="block w-full bg-white" src={feed.docterImgUrl} alt="userImg" /> */}
                                            <img className="block w-full bg-white" src={"#"} alt="userImg" />
                                        </div>
                                        <p>{feed.docterName}님의 전문답변</p>
                                    </div>
                                    <div className="text-lg max-h-60 overflow-hidden line-clamp-[3] mb-4">
                                        {feed.docterComment}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <div ref={elementRef}>endData...</div>
                </div>
            </div>
        </div>
    );
}
