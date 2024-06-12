export default function FeedList({ category }) {
    const feedData = [
        {
            userId: "문승종",
            profileUrl: "/common/header/attiLogo.png",
            category: "일반 고민",
            feedNum: 1,
            feedContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            feedDate: "2024-06-21",
            replyCount: 2,
            inPublic: "Y",
            loginUserIsLiked: false
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
            loginUserIsLiked: true
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
            loginUserIsLiked: false
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
            loginUserIsLiked: true
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
            loginUserIsLiked: false
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
            loginUserIsLiked: false
        }
        
    ];

    return (
        <div className="p-10">
            <div className="border flex justify-center">
                <div className="gap-8 columns-2">
                    {feedData.map((feed, idx) => (
                        <div key={idx} className="flex flex-col border w-full p-4 rounded-[40px] mb-4">
                            <div className="flex gap-2 text-m items-center text-gray-500">
                                <p>{feed.category}</p>
                                <p>|</p>
                                <div className="border w-10 h-10 rounded-full overflow-hidden">
                                    <img className="block w-full" src={feed.profileUrl} alt="userImg" />
                                </div>
                                <p>{feed.inPublic === "Y" ? feed.userId : "비공개"}</p>
                                <p>{feed.feedDate}</p>
                            </div>
                            <div className="text-lg border max-h-60 overflow-hidden line-clamp-[8]">
                                {feed.feedContent}
                            </div>
                            <div className="flex gap-2">
                                <button>하트</button>
                                <button>댓글모양</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
