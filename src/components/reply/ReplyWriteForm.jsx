import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '../common/Button';
import { postReply } from '@/api/reply/reply';

const CustomEditorReply = dynamic(() => {
    return import('@/components/common/custom-editorReply');
}, { ssr: false });



export default function ReplyWriteForm({ data, fetchData, user }) {
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [editorDataReply, setEditorDataReply] = useState("");
    const [key, setKey] = useState(0);


    const submitReply = async () => {
        const replyForm = {
            feedNum: data.feedNum,
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
        <div className={`max-w-screen-lg p-4 mx-auto ${user.userId == "" ? "hidden" : ""}`}>
            <div className=" flex gap-4 p-2 justify-between text-gray-400">
                <div className=" flex items-center gap-2 ">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img className="block w-full"src={user.userProfileUrl ? `${NEXT_PUBLIC_API_URL}` + user.userProfileUrl : "/common/user/noProfile.png"} alt="userImg" />
                    </div>
                    <p>{user.userId}</p>
                </div>
                <Button text={"등록"} onClick={submitReply} />
            </div>
            <CustomEditorReply key={key}
                initialData={""}
                placeholder={"댓글 남기기"}
                className="border"
                value={editorDataReply}
                readOnly={false}
                setData={setEditorDataReply}
            />
        </div>
    )
}
