import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '../common/Button';

const CustomEditorReply = dynamic(() => {
    return import('@/components/common/custom-editorReply');
}, { ssr: false });

const user = {
    userId: "user01",
    userProfile: "#"
}

export default function ReplyWirteForm({data}) {
    const [editorDataReply, setEditorDataReply] = useState("");

    const submitReply = () => {
        console.log(editorDataReply);
        const replyForm = {
            feedNum: data.feedNum,
            replyContent: editorDataReply
        }
    }

    return (
        <div className="p-2 border">
            <div className="flex gap-4 p-2 justify-between text-gray-400">
                <div className="border flex items-center gap-2 ">
                    <div className="border w-10 h-10 rounded-full overflow-hidden">
                        {/* <img className="block w-full" src={user.userProfileUrl} alt="userImg" /> */}
                        <img className="block w-full" src={"#"} alt="userImg" />
                    </div>
                    <p>{user.userId}</p>
                </div>
                <Button text={"등록"} onClick={submitReply} />
            </div>
            <CustomEditorReply placeholder={"댓글 남기기"} className="border" value={editorDataReply} readOnly={false} setData={setEditorDataReply} />
        </div>
    )
}