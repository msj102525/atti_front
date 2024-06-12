import { entries } from "mobx";
import { useRef, useState, useEffect } from "react";

export default function FeedList({ category }) {
    // const feedData = [
    //     {
    //         userId: "문승종",
    //         profileUrl: "/common/header/attiLogo.png",
    //         category: "일반 고민",
    //         feedNum: 1,
    //         feedContent: "긴글 확인용 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //         feedDate: "2024-06-21",
    //         replyCount: 2,
    //         inPublic: "Y",
    //         loginUserIsLiked: false,
    //         isDocterComment: true,
    //         docterImgUrl: "/common/header/attiLogo.png",
    //         docterName: "김의사",
    //         docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"
    //     },
    //     {
    //         userId: "김철수",
    //         profileUrl: "/common/header/attiLogo.png",
    //         category: "학교 고민",
    //         feedNum: 2,
    //         feedContent: "학교 생활에서의 어려움에 대한 고민입니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //         feedDate: "2024-06-20",
    //         replyCount: 3,
    //         inPublic: "N",
    //         loginUserIsLiked: true,
    //         isDocterComment: false,
    //         docterImgUrl: "/common/header/attiLogo.png",
    //         docterName: "김의사",
    //         docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

    //     },
    //     {
    //         userId: "이영희",
    //         profileUrl: "/common/header/attiLogo.png",
    //         category: "직장 고민",
    //         feedNum: 3,
    //         feedContent: "직장에서의 스트레스와 고민들에 대한 이야기입니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //         feedDate: "2024-06-19",
    //         replyCount: 1,
    //         inPublic: "Y",
    //         loginUserIsLiked: false,
    //         isDocterComment: true,
    //         docterImgUrl: "/common/header/attiLogo.png",
    //         docterName: "김의사",
    //         docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

    //     },
    //     {
    //         userId: "박민수",
    //         profileUrl: "/common/header/attiLogo.png",
    //         category: "일반 고민",
    //         feedNum: 4,
    //         feedContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //         feedDate: "2024-06-18",
    //         replyCount: 5,
    //         inPublic: "Y",
    //         loginUserIsLiked: true,
    //         isDocterComment: false,
    //         docterImgUrl: "/common/header/attiLogo.png",
    //         docterName: "김의사",
    //         docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

    //     },
    //     {
    //         userId: "장수진1",
    //         profileUrl: "/common/header/attiLogo.png",
    //         category: "건강 고민",
    //         feedNum: 5,
    //         feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //         feedDate: "2024-06-17",
    //         replyCount: 4,
    //         inPublic: "N",
    //         loginUserIsLiked: false,
    //         isDocterComment: false,
    //         docterImgUrl: "/common/header/attiLogo.png",
    //         docterName: "김의사",
    //         docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

    //     },
    //     {
    //         userId: "장수진2",
    //         profileUrl: "/common/header/attiLogo.png",
    //         category: "건강 고민",
    //         feedNum: 5,
    //         feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //         feedDate: "2024-06-17",
    //         replyCount: 4,
    //         inPublic: "N",
    //         loginUserIsLiked: false,
    //         isDocterComment: false,
    //         docterImgUrl: "/common/header/attiLogo.png",
    //         docterName: "김의사",
    //         docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

    //     }
    //     ,
    //     {
    //         userId: "장수진3",
    //         profileUrl: "/common/header/attiLogo.png",
    //         category: "건강 고민",
    //         feedNum: 5,
    //         feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //         feedDate: "2024-06-17",
    //         replyCount: 4,
    //         inPublic: "N",
    //         loginUserIsLiked: false,
    //         isDocterComment: false,
    //         docterImgUrl: "/common/header/attiLogo.png",
    //         docterName: "김의사",
    //         docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

    //     }
    // ];

    const [feedData, setFeedData] = useState(
        [{
            userId: "문승종",
            profileUrl: "/common/header/attiLogo.png",
            category: "일반 고민",
            feedNum: 1,
            feedContent: "긴글 확인용 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-21",
            replyCount: 2,
            inPublic: "Y",
            loginUserIsLiked: false,
            isDocterComment: true,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"
        },
        {
            userId: "김철수",
            profileUrl: "/common/header/attiLogo.png",
            category: "학교 고민",
            feedNum: 2,
            feedContent: "학교 생활에서의 어려움에 대한 고민입니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-20",
            replyCount: 3,
            inPublic: "N",
            loginUserIsLiked: true,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        },
        {
            userId: "이영희",
            profileUrl: "/common/header/attiLogo.png",
            category: "직장 고민",
            feedNum: 3,
            feedContent: "직장에서의 스트레스와 고민들에 대한 이야기입니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-19",
            replyCount: 1,
            inPublic: "Y",
            loginUserIsLiked: false,
            isDocterComment: true,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        },
        {
            userId: "박민수",
            profileUrl: "/common/header/attiLogo.png",
            category: "일반 고민",
            feedNum: 4,
            feedContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            feedDate: "2024-06-18",
            replyCount: 5,
            inPublic: "Y",
            loginUserIsLiked: true,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        },
        {
            userId: "장수진1",
            profileUrl: "/common/header/attiLogo.png",
            category: "건강 고민",
            feedNum: 5,
            feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-17",
            replyCount: 4,
            inPublic: "N",
            loginUserIsLiked: false,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        },
        {
            userId: "장수진2",
            profileUrl: "/common/header/attiLogo.png",
            category: "건강 고민",
            feedNum: 5,
            feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-17",
            replyCount: 4,
            inPublic: "N",
            loginUserIsLiked: false,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        }
            ,
        {
            userId: "장수진3",
            profileUrl: "/common/header/attiLogo.png",
            category: "건강 고민",
            feedNum: 5,
            feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-17",
            replyCount: 4,
            inPublic: "N",
            loginUserIsLiked: false,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        }]);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observeRef = useRef(null);


    const loadMoreData = async () => {
        if (loading) return;

        setLoading(true);

        // api 호출
        const newFeedData = [{
            userId: "새로운데이터",
            profileUrl: "/common/header/attiLogo.png",
            category: "일반 고민",
            feedNum: 1,
            feedContent: "긴글 확인용 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-21",
            replyCount: 2,
            inPublic: "Y",
            loginUserIsLiked: false,
            isDocterComment: true,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"
        },
        {
            userId: "새로운데이터",
            profileUrl: "/common/header/attiLogo.png",
            category: "학교 고민",
            feedNum: 2,
            feedContent: "학교 생활에서의 어려움에 대한 고민입니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-20",
            replyCount: 3,
            inPublic: "N",
            loginUserIsLiked: true,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        },
        {
            userId: "새로운데이터",
            profileUrl: "/common/header/attiLogo.png",
            category: "직장 고민",
            feedNum: 3,
            feedContent: "직장에서의 스트레스와 고민들에 대한 이야기입니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-19",
            replyCount: 1,
            inPublic: "Y",
            loginUserIsLiked: false,
            isDocterComment: true,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        },
        {
            userId: "새로운데이터",
            profileUrl: "/common/header/attiLogo.png",
            category: "일반 고민",
            feedNum: 4,
            feedContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            feedDate: "2024-06-18",
            replyCount: 5,
            inPublic: "Y",
            loginUserIsLiked: true,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        },
        {
            userId: "새로운데이터",
            profileUrl: "/common/header/attiLogo.png",
            category: "건강 고민",
            feedNum: 5,
            feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-17",
            replyCount: 4,
            inPublic: "N",
            loginUserIsLiked: false,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        },
        {
            userId: "새로운데이터",
            profileUrl: "/common/header/attiLogo.png",
            category: "건강 고민",
            feedNum: 5,
            feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-17",
            replyCount: 4,
            inPublic: "N",
            loginUserIsLiked: false,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        }
            ,
        {
            userId: "새로운데이터",
            profileUrl: "/common/header/attiLogo.png",
            category: "건강 고민",
            feedNum: 5,
            feedContent: "건강에 대한 걱정과 고민을 나눕니다. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-17",
            replyCount: 4,
            inPublic: "N",
            loginUserIsLiked: false,
            isDocterComment: false,
            docterImgUrl: "/common/header/attiLogo.png",
            docterName: "김의사",
            docterComment: "의사전문 답변 의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변의사전문 답변"

        }]

        setFeedData(prevFeedData => [...prevFeedData, ...newFeedData]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);

        console.log("observe 작동");
        console.log(loading);
        console.log(`page수: ${page}`);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMoreData();
                }
            },
            { threshold: 0 }
        )

        if (observeRef.current) {
            observer.observe(observeRef.current);
        }

        return () => {
            if (observeRef.current) {
                observer.unobserve(observeRef.current);
            }
        };

        
    }, [loading, page]);


    return (
        <div className="p-10">
            <div className="flex justify-center">
                <div className="gap-8 columns-2">
                    {feedData.map((feed, idx) => (
                        <div key={idx} className="flex flex-col border w-full p-4 rounded-[40px] mb-4">
                            <div className="flex gap-2 text-m items-center text-gray-500 pb-2">
                                <p>{feed.category}</p>
                                <p>|</p>
                                <div className="border w-10 h-10 rounded-full overflow-hidden">
                                    <img className="block w-full" src={feed.profileUrl} alt="userImg" />
                                </div>
                                <p>{feed.inPublic === "Y" ? feed.userId : "비공개"}</p>
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
                            <div className={`${feed.isDocterComment ? "block" : "hidden"} border p-1 rounded-[20px] bg-cyan-100`}>
                                <div className="flex items-center">
                                    <div className="border w-10 h-10 rounded-full overflow-hidden">
                                        <img className="block w-full bg-white" src={feed.docterImgUrl} alt="userImg" />
                                    </div>
                                    <p>{feed.docterName}님의 전문답변</p>
                                </div>
                                <div className="text-lg max-h-60 overflow-hidden line-clamp-[3] mb-4">
                                    {feed.docterComment}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={observeRef}>Loading...</div>
                </div>
            </div>
        </div>
    );
}
