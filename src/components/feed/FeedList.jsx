import { getListByCategory } from "@/api/feed/feed";
import { useRef, useState, useEffect } from "react";

export default function FeedList({ category }) {
    // const size = 10;
    // const [feedData, setFeedData] = useState([]);
    // const [page, setPage] = useState(0);
    // const [loading, setLoading] = useState(false);
    // const [totalPage, setTotalPage] = useState(0);

    // console.log(`page, totalPage: ${page}, ${totalPage}`);

    // const observeRef = useRef(null);

    // const loadMoreData = async () => {
    //     if (loading) return;
    //     setLoading(true);

    //     const newFeedData = await getListByCategory(category, page, size);

    //     setFeedData(prevFeedData => [...prevFeedData, ...newFeedData]);
    //     setPage(prevPage => prevPage + 1);
    //     setLoading(false);

    // }



    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const firstData = await getListByCategory(category, page, size);
    //             setFeedData(firstData);
    //             setPage(0);

    //             if (feedData.length != 0) {
    //                 setTotalPage(feedData[0].totalPage);
    //             }

    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, [category]);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         entries => {
    //             if (entries[0].isIntersecting) {
    //                 loadMoreData();
    //             }
    //         },
    //         { threshold: 0.1 }
    //     )

    //     if (observeRef.current) {
    //         observer.observe(observeRef.current);
    //     }

    //     return () => {
    //         if (observeRef.current) {
    //             observer.unobserve(observeRef.current);
    //         }
    //     };
    // }, [loading, page]);


    const [feedData, setFeedData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const elementRef = useRef(null);
    const size = 10;

    useEffect(() => {
        getListByCategory(category, page, size)
        .then(res => {
            setFeedData((prevProducts) => [...prevProducts, ...res]);
        })

    }, [page])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const firstData = await getListByCategory(category, page, size);
                setFeedData(firstData);
                setPage(0);

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

    // 컴포넌트 렌더링 이후에 실행되며 Intersection Observer를 설정
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
                <div className="gap-8 columns-2">
                    {feedData.map((feed, idx) => (
                        <div key={idx} className="flex flex-col border max-w-md p-4 rounded-[40px] mb-4">
                            <div className="flex gap-2 text-m items-center text-gray-500 pb-2">
                                <p>{feed.category}</p>
                                <p>|</p>
                                <div className="border w-10 h-10 rounded-full overflow-hidden">
                                    {/* <img className="block w-full" src={feed.feedWriterProfileUrl} alt="userImg" /> */}
                                    <img className="block w-full" src={"#"} alt="userImg" />
                                </div>
                                <p>{feed.inPublic === "Y" ? feed.feedWriterId : "비공개"}</p>
                                <p>{feed.feedDate}</p>
                            </div>
                            <div className="text-lg max-h-60 overflow-hidden line-clamp-[8] mb-4">
                                {feed.feedContent}
                            </div>
                            <div className="flex gap-1">
                                <img src={feed.loginUserIsLiked ? "/feed/fillHeart.png" : "/feed/emptyHeart.png"} alt="" />
                                <img src={"/feed/comment.png"} alt="댓글" />
                                {feed.replyCount}
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
                        </div>
                    ))}
                    {/* <div className={page > totalPage ? "hidden" : ""} ref={observeRef}>Loading...</div> */}
                    <div ref={elementRef}>endData...</div>
                </div>
            </div>
        </div>
    );
}
