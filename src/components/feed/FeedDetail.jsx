import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from "../common/Button";
import { updateFeed } from "@/api/feed/feed";
import { useRouter } from 'next/router';


const CustomEditor = dynamic(() => {
    return import('@/components/common/custom-editor');
}, { ssr: false });


let user = {
    userId: "user01",
    userProfileUrl: "#"
}


export default function FeedDetail({ data }) {
    const router = useRouter();

    const [editorData, setEditorData] = useState(data.feedContent);

    const modFormData = {
        userId: data.feedWriterId,
        feedNum: data.feedNum,
        category: data.category,
        inPublic: data.inPublic,
        feedContent: editorData
    }


    const handleModSubmit = () => {
        console.log(data);
        console.log(modFormData);

        updateFeed(modFormData)
            .then(res => {
                if (res.status === 204) {
                    router.push("/feed");
                } else {
                    console.error("Unexpected response status:", res.status);
                }
            })
            .catch(err => {
                console.error("피드 등록 실패:", err);
            });
    };


    return (
        <div className="max-w-screen-lg p-4">
            <div className="after:content-[''] after:bg-gray-300 after:block after:w-full after:h-[2px] after:left-0 after-bottom-0">
                <div className="flex p-4">
                    <p>홈화면&gt;</p>
                    <p>커뮤니티&gt;</p>
                    <p>{data.category}</p>
                </div>
            </div>
            <div className='w-full p-4 shadow-xl'>
                <div className='flex justify-between pb-4'>
                    <div className="flex items-center gap-x-2 text-gray-400">
                        <div className="border w-10 h-10 rounded-full overflow-hidden">
                            {/* <img className="block w-full" src={editorData.feedWriterProfileUrl} alt="userImg" /> */}
                            <img className="block w-full" src={"#"} alt="userImg" />
                        </div>
                        <p>{data.inPublic === "Y" ? data.feedWriterId : "비공개"}</p>
                        <p> | </p>
                        <p>{data.feedDate}</p>
                    </div>
                    <div className={data.feedWriterId == user.userId ? "flex gap-4" : "hidden"}>
                        <Button text={"수정"} onClick={handleModSubmit} />
                        <Button text={"삭제"} />
                    </div>
                </div>
                <div className="py-8 w-[38vw]">
                    {editorData && (
                        <CustomEditor readOnly={data.feedWriterId == user.userId ? false : true} value={editorData} initialData={data.feedContent} setData={setEditorData} />
                    )}
                </div>
                <div className="flex gap-x-4">
                    <div className="flex gap-1 cursor-pointer">
                        <img src={data.loginUserIsLiked ? "/feed/fillHeart.png" : "/feed/emptyHeart.png"} alt="" />
                        {data.likeCount}
                    </div>
                    <div className="flex gap-1">
                        <img src={"/feed/comment.png"} alt="댓글" />
                        {data.replyCount}
                    </div>
                </div>
            </div>
        </div>
    )
}