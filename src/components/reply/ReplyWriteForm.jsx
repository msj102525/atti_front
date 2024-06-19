import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '../common/Button';
import { postReply } from '@/api/reply/reply';

const CustomEditorReply = dynamic(() => {
    return import('@/components/common/custom-editorReply');
}, { ssr: false });

const user = {
    userId: "user01",
    userProfile: "#"
}

export default function ReplyWriteForm({ data, fetchData }) {
    const [editorDataReply, setEditorDataReply] = useState("");
    const [key, setKey] = useState(0);

    const submitReply = async () => {
        const replyForm = {
            feedNum: data.feedNum,
            replyContent: editorDataReply,
            replyReplyRef: data.replyNum
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
            <div className="border flex gap-4 p-2 justify-between text-gray-400">
                <div className="border flex items-center gap-2 ">
                    <div className="border w-10 h-10 rounded-full overflow-hidden">
                        <img className="block w-full" src={"#"} alt="userImg" />
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
