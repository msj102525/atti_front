import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/api/feed/feed";
import { searchSimilarFeeds } from "@/api/feed/feed";

export default function SimilarFeedList({ data }) {
    const feedData = [
        {
            "totalPage": 0,
            "feedWriterId": "user11",
            "feedWriterProfileUrl": "profileUrl_value11",
            "category": "일반 고민",
            "feedNum": 58,
            "feedContent": "user11의 글 58번째 글",
            "feedDate": "2024-06-20T16:57:40",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user11",
            "feedWriterProfileUrl": "profileUrl_value11",
            "category": "취업/진로",
            "feedNum": 57,
            "feedContent": "user11의 글 57번째 글",
            "feedDate": "2024-06-20T16:57:39",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user11",
            "feedWriterProfileUrl": "profileUrl_value11",
            "category": "대인관계",
            "feedNum": 56,
            "feedContent": "user11의 글 56번째 글",
            "feedDate": "2024-06-20T16:57:37",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user10",
            "feedWriterProfileUrl": "profileUrl_value10",
            "category": "정신건강",
            "feedNum": 55,
            "feedContent": "user10의 글 55번째 글",
            "feedDate": "2024-06-20T16:57:36",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user10",
            "feedWriterProfileUrl": "profileUrl_value10",
            "category": "자아/성격",
            "feedNum": 54,
            "feedContent": "user10의 글 54번째 글",
            "feedDate": "2024-06-20T16:57:35",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user10",
            "feedWriterProfileUrl": "profileUrl_value10",
            "category": "연애",
            "feedNum": 53,
            "feedContent": "user10의 글 53번째 글",
            "feedDate": "2024-06-20T16:57:33",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user10",
            "feedWriterProfileUrl": "profileUrl_value10",
            "category": "외모",
            "feedNum": 52,
            "feedContent": "user10의 글 52번째 글",
            "feedDate": "2024-06-20T16:57:32",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user10",
            "feedWriterProfileUrl": "profileUrl_value10",
            "category": "일반 고민",
            "feedNum": 51,
            "feedContent": "user10의 글 51번째 글",
            "feedDate": "2024-06-20T16:57:30",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user09",
            "feedWriterProfileUrl": "profileUrl_value9",
            "category": "취업/진로",
            "feedNum": 50,
            "feedContent": "user09의 글 50번째 글",
            "feedDate": "2024-06-20T16:57:29",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        },
        {
            "totalPage": 0,
            "feedWriterId": "user09",
            "feedWriterProfileUrl": "profileUrl_value9",
            "category": "외모",
            "feedNum": 49,
            "feedContent": "user09의 글 49번째 글",
            "feedDate": "2024-06-20T16:57:28",
            "inPublic": "Y",
            "replyCount": 0,
            "likeCount": 0,
            "loginUserIsLiked": false,
            "docterName": "No doctor user found",
            "docterImgUrl": "",
            "docterComent": "No doctor user found",
            "dcomentExist": false
        }
    ]
    const [similarFeeds, setSimilarFeeds] = useState([]);
    
    // const [feedContent, setFeedContent] = useState(data.feedContent.replace(/<\/?[^>]+(>|$)/g, " ").replace(/&nbsp;/g, " "));

    console.log(data);
    // console.log(feedContent);

    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await searchSimilarFeeds(data.feedNum);
                // if(res.data.length > 0) {
                //     // setSimilarFeeds(res.data);
                // }

            } catch(error) {
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
                    {feedData.map((feed, idx) => (
                        <div key={idx} className="flex flex-col border min-w-full p-4 rounded-[40px] mb-4 cursor-pointer hover-grow">
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
                                <div className={`${feed.dcomentExist ? "block" : "hidden"} border p-1 rounded-[20px] bg-customBrown2`}>
                                    <div className="flex items-center">
                                        <div className="border w-10 h-10 rounded-full overflow-hidden">
                                            {/* <img className="block w-full bg-white" src={process.NEXT_PUBLIC_API_URL + `${feed.docterImgUrl}`} alt="userImg" /> */}
                                            <img className="block w-full bg-white" src={"#"} alt="userImg" />
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