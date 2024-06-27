import { useState, useEffect } from "react";
import { formatDate } from "@/api/feed/feed";
import { getReplyList } from "@/api/reply/reply";
import dynamic from 'next/dynamic';
import Button from '../common/Button';
import { postReply } from '@/api/reply/reply';
import { authStore } from "@/pages/stores/authStore";

const CustomEditorReply = dynamic(() => {
    return import('@/components/common/custom-editorReply');
}, { ssr: false });


export default function ReplyList({ data, fetchData, user }) {
    const [replyList, setReplyList] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [feedNumReplyNum, setFeedNumReplyNum] = useState(null);
    const [selectedReply, setSelectedReply] = useState(null);

    const [editorDataReply, setEditorDataReply] = useState("");
    const [key, setKey] = useState(0);


    useEffect(() => {
        const fetchReplyList = async () => {
            try {
                const res = await getReplyList(data.feedNum);
                setReplyList(res);
            } catch (error) {
                console.error("Error fetching reply list:", error);
            }
        };

        fetchReplyList();
    }, [data]);

    const handleToggleReplyForm = (parentReply) => {
        if (!user.userId) {
            console.log("로그인 X");
            return;
        }
        if (selectedReply && selectedReply.feedNum === parentReply.feedNum && selectedReply.replyNum === parentReply.replyNum) {
            setShowReplyForm(false);
            setSelectedReply(null);
        } else {
            setFeedNumReplyNum(parentReply);
            setShowReplyForm(true);
            setSelectedReply(parentReply);
        }
    }


    const submitReply = async () => {
        const replyForm = {
            feedNum: feedNumReplyNum.feedNum,
            replyNum: feedNumReplyNum.replyNum,
            replyContent: editorDataReply,
        }

        try {
            const response = await postReply(replyForm);
            if (response.status === 200) {
                setKey(prevKey => prevKey + 1);
                fetchData();
            } else {
                console.error("댓글 등록 실패:", response.status);
            }
        } catch (err) {
            console.error("댓글 등록 실패:", err);
        }
    }

    return (
        <div className="border max-w-screen-lg p-4 mx-auto">
            <div className="p-10">
                <div className="flex justify-center w-full">
                    <div className="gap-24 columns-1 w-full">
                        {replyList.map((reply, idx) => (
                            <div key={idx} className="mb-4">
                                <div
                                    className={`${user.userId == "" ? "" : "cursor-pointer"} border-[#001219] flex flex-col border w-full p-4 rounded-[40px] ${reply.replyUserType === "D" ? "bg-customBrown2" : ""}`}
                                    onClick={() => handleToggleReplyForm({ feedNum: reply.feedNum, replyNum: reply.replyNum })}
                                >
                                    <div className="flex gap-2 text-m items-center text-gray-500 pb-2 w-full">
                                        <div className="border w-10 h-10 rounded-full overflow-hidden">
                                            <img className="block w-full" src={reply.replyWriterProfileUrl} alt="userImg" />
                                        </div>
                                        <p>{reply.replyWriter}</p>
                                        <p>{formatDate(reply.replyDate)}</p>
                                    </div>
                                    <div className="text-lg max-h-60 overflow-hidden line-clamp-[8] mb-4 after:content-[''] after:bg-slate-500 after:block after:w-full after:h-[2px] after:left-0 after-bottom-0"
                                        dangerouslySetInnerHTML={{ __html: reply.replyContent }}
                                    />
                                    <div>
                                        {reply.childReply.length > 0 && (
                                            <div className="p-2 pl-40">
                                                {reply.childReply.map((subReply, subIdx) => (
                                                    <div key={subIdx} className={`flex flex-col w-full p-4 rounded-[40px] mb-4 after:content-[''] after:bg-black after:block after:w-full after:h-[1px] after:left-0 after-bottom-0 ${subReply.replyUserType === "D" ? "bg-customBrown2" : ""}`}>
                                                        <div className="flex gap-2 text-m items-center text-gray-500 pb-2 w-full">
                                                            <div className="border w-10 h-10 rounded-full overflow-hidden">
                                                                <img className="block w-full" src={subReply.replyWriterProfileUrl} alt="userImg" />
                                                            </div>
                                                            <p>{subReply.replyWriter}</p>
                                                            <p>{subReply.replySeq}</p>
                                                            <p>{formatDate(subReply.replyDate)}</p>
                                                        </div>
                                                        <div className="text-lg max-h-60 overflow-hidden line-clamp-[8] text-black"
                                                            dangerouslySetInnerHTML={{ __html: subReply.replyContent }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {selectedReply && selectedReply.feedNum === reply.feedNum && selectedReply.replyNum === reply.replyNum && showReplyForm && (
                                    <div className=" max-w-screen-lg p-4 mx-auto">
                                        <div className="border flex gap-4 p-2 justify-between text-gray-400">
                                            <div className=" flex items-center gap-2 ">
                                                <div className=" w-10 h-10 rounded-full overflow-hidden">
                                                    <img className="block w-full" src={`${user.userProfileUrl}`} alt="userImg" />
                                                </div>
                                                <p>{user.userId}</p>
                                            </div>
                                            <Button text={"등록"} onClick={submitReply} />
                                        </div>
                                        <CustomEditorReply
                                            key={key}
                                            initialData={""}
                                            placeholder={"댓글 남기기"}
                                            className="border"
                                            value={editorDataReply}
                                            readOnly={false}
                                            setData={setEditorDataReply}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
