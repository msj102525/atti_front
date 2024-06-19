import { formatDate } from "@/api/feed/feed"
import { useEffect, useState, useRef } from "react";
import { getReplyList } from "@/api/reply/reply";

export default function ReplyList({ data }) {
    const replyList2 = [
        {
            feedNum: 53,
            replyNum: 42,
            replyReplyRef: 0,
            replyLev: 1,
            replySeq: 1,
            replyWriter: "user02",
            replyUserType: "D",
            replyWriterProfileUrl: "profileUrl_value2",
            replyDate: "2024-06-19T15:11:03",
            replyContent: "<p>ㄹㄴㅁㄹㄴㅁㄹ</p>",
            childReply: []
        },
        {
            feedNum: 53,
            replyNum: 41,
            replyReplyRef: 0,
            replyLev: 1,
            replySeq: 1,
            replyWriter: "user02",
            replyUserType: "U",
            replyWriterProfileUrl: "profileUrl_value2",
            replyDate: "2024-06-19T15:10:50",
            replyContent: "<p>댓글남기면 list 재출력</p>",
            childReply: []
        },
        {
            feedNum: 53,
            replyNum: 36,
            replyReplyRef: 0,
            replyLev: 1,
            replySeq: 1,
            replyWriter: "user02",
            replyUserType: "U",
            replyWriterProfileUrl: "profileUrl_value2",
            replyDate: "2024-06-18T19:34:15",
            replyContent: "<p>react로 댓글 남기기</p>",
            childReply: []
        },
        {
            feedNum: 53,
            replyNum: 34,
            replyReplyRef: 0,
            replyLev: 1,
            replySeq: 1,
            replyWriter: "user02",
            replyUserType: "U",
            replyWriterProfileUrl: "profileUrl_value2",
            replyDate: "2024-06-18T19:26:00",
            replyContent: "POSTMAN으로 댓글 요청 2트",
            childReply: [
                {
                    feedNum: 53,
                    replyNum: 43,
                    replyReplyRef: 34,
                    replyLev: 2,
                    replySeq: 2,
                    replyWriter: "user02",
                    replyUserType: "D",
                    replyWriterProfileUrl: "profileUrl_value2",
                    replyDate: "2024-06-19T15:55:22",
                    replyContent: "POSTMAN으로 대댓글 요청 2트",
                    childReply: null
                },
                {
                    feedNum: 53,
                    replyNum: 44,
                    replyReplyRef: 34,
                    replyLev: 2,
                    replySeq: 2,
                    replyWriter: "user02",
                    replyUserType: "U",
                    replyWriterProfileUrl: "profileUrl_value2",
                    replyDate: "2024-06-19T15:55:26",
                    replyContent: "POSTMAN으로 대댓글 요청 2트",
                    childReply: null
                },
                {
                    feedNum: 53,
                    replyNum: 35,
                    replyReplyRef: 34,
                    replyLev: 2,
                    replySeq: 2,
                    replyWriter: "user02",
                    replyUserType: "U",
                    replyWriterProfileUrl: "profileUrl_value2",
                    replyDate: "2024-06-18T19:27:07",
                    replyContent: "POSTMAN으로 대댓글 요청 2트",
                    childReply: null
                }
            ]
        },
        {
            feedNum: 53,
            replyNum: 33,
            replyReplyRef: 0,
            replyLev: 1,
            replySeq: 1,
            replyWriter: "user02",
            replyUserType: "U",
            replyWriterProfileUrl: "profileUrl_value2",
            replyDate: "2024-06-18T19:08:17",
            replyContent: "POSTMAN으로 대댓글 요청 1트",
            childReply: []
        },
        {
            feedNum: 53,
            replyNum: 32,
            replyReplyRef: 0,
            replyLev: 1,
            replySeq: 1,
            replyWriter: "user02",
            replyUserType: "U",
            replyWriterProfileUrl: "profileUrl_value2",
            replyDate: "2024-06-18T19:07:38",
            replyContent: "POSTMAN으로 댓글 요청 1트",
            childReply: []
        },
        {
            feedNum: 53,
            replyNum: 31,
            replyReplyRef: 0,
            replyLev: 1,
            replySeq: 1,
            replyWriter: "user02",
            replyUserType: "U",
            replyWriterProfileUrl: "profileUrl_value2",
            replyDate: "2024-06-18T19:02:32",
            replyContent: "<p>ㄹㅇㄴㅁㄹㅇㄴㅁ</p>",
            childReply: []
        }
    ]

    const [replyList, setReplyList] = useState([])


    useEffect(() => {
        const fetchMoreData = async () => {
            await getReplyList(data.feedNum)
                .then(res => {
                    setReplyList(res);
                })
                .catch(error => {
                    console.error("Error fetching more data:", error);
                })
        };
        fetchMoreData();
    }, [data]);


    return (
        <div className="border max-w-screen-lg p-4 mx-auto">
            <div className="p-10">
                <div className="flex justify-center w-full">
                    <div className="gap-24 columns-1 w-full">
                        {replyList.map((reply, idx) => (
                            <div key={idx} className="mb-4">
                                <div className={`cursor-pointer flex flex-col border w-full p-4 rounded-[40px] ${reply.replyUserType === "D" ? "bg-customBrown2" : ""}`}>
                                    <div className="flex gap-2 text-m items-center text-gray-500 pb-2 w-full">
                                        <div className="border w-10 h-10 rounded-full overflow-hidden">
                                            <img className="block w-full" src={reply.replyWriterProfileUrl} alt="userImg" />
                                        </div>
                                        <p>{reply.replyWriter}</p>
                                        <p>{formatDate(reply.replyDate)}</p>
                                    </div>
                                    <div className="text-lg max-h-60 overflow-hidden line-clamp-[8] mb-4 after:content-[''] after:bg-black after:block after:w-full after:h-[1px] after:left-0 after-bottom-0s"
                                        dangerouslySetInnerHTML={{ __html: reply.replyContent }} />
                                    <div className="">
                                        {reply.childReply.length > 0 && (
                                            <div className="p-2 pl-40">
                                                {reply.childReply.length > 0 && (
                                                    <div className="p-2 pl-40">
                                                        {reply.childReply.map((subReply, subIdx) => (
                                                            <div key={subIdx} className={(subReply.replyUserType === "D" ? "bg-customBrown2 " : "") + "flex flex-col w-full p-4 rounded-[40px] mb-4 after:content-[''] after:bg-black after:block after:w-full after:h-[1px] after:left-0 after-bottom-0"}>
                                                                <div className="flex gap-2 text-m items-center text-gray-500 pb-2 w-full">
                                                                    <div className="border w-10 h-10 rounded-full overflow-hidden">
                                                                        <img className="block w-full" src={subReply.replyWriterProfileUrl} alt="userImg" />
                                                                    </div>
                                                                    <p>{subReply.replyWriter}</p>
                                                                    <p>{formatDate(subReply.replyDate)}</p>
                                                                </div>
                                                                <div className="text-lg max-h-60 overflow-hidden line-clamp-[8] text-black"
                                                                    dangerouslySetInnerHTML={{ __html: subReply.replyContent }} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
