import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from "../common/Button";
import { updateFeed, formatDate, deleteFeedByFeedNum } from "@/api/feed/feed";
import { postLike } from '@/api/likeHistory/likeHistory';
import { useRouter } from 'next/router';

const CustomEditor = dynamic(() => {
    return import('@/components/common/custom-editor');
}, { ssr: false });



export default function FeedDetail({ data, user }) {
    const router = useRouter();

    const [editorData, setEditorData] = useState(data.feedContent);
    const [likeCount, setLikeCount] = useState(data.likeCount);
    const [loginUserIsLiked, setLoginUserIsLiked] = useState(data.loginUserIsLiked);
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;



    const modFormData = {
        // userId: data.feedWriterId,
        feedNum: data.feedNum,
        category: data.category,
        inPublic: data.inPublic,
        feedContent: editorData
    }
/* eslint-disable no-restricted-globals */
    const handleModSubmit = async () => {
        const userConfirmed = confirm('게시글을 수정하시겠습니까?');
    
        if (userConfirmed) {
            try {
                const response = await updateFeed(modFormData);
                if (response.status === 204) {
                    alert("게시글이 성공적으로 수정되었습니다.");
                    router.push("/feed");
                } else {
                    console.error("Unexpected response status:", response.status);
                    alert("게시글 수정에 실패하였습니다.");
                }
            } catch (err) {
                console.error("피드 수정 처리 실패:", err);
                alert("피드 수정 처리 중 오류가 발생하였습니다.");
            }
        } else {
            alert('게시글 수정을 취소하였습니다.');
        }
    };
    
    

    const handleLikeSubmit = async () => {
        try {
            const response = await postLike(data.feedNum);
            if (response.status === 200) {
                setLoginUserIsLiked(!loginUserIsLiked);
                setLikeCount(loginUserIsLiked ? likeCount - 1 : likeCount + 1);
            } else if(response.status === 403) {
                alert("로그인 후 이용해주세요!");
            }
        } catch (err) {
            console.error("좋아요 처리 실패:", err);
        }
    }

    const handleDeleteSubmit = async () => {
        const userConfirmed = confirm('게시글을 삭제하시겠습니까?');
    
        if (userConfirmed) {
            try {
                const response = await deleteFeedByFeedNum(data.feedNum);
                if (response.status === 204) {
                    alert("게시글을 삭제하였습니다.");
                    router.push("/feed");
                } else {
                    alert("게시글 삭제에 실패하였습니다.");
                }
            } catch (err) {
                console.error("피드삭제 처리 실패:", err);
                alert("피드 삭제 처리 중 오류가 발생하였습니다.");
            }
        } else {
            alert('게시글 삭제를 취소하였습니다.');
        }
    };
    console.log(user);
/* eslint-enable no-restricted-globals */
    return (
        <div className="border max-w-screen-lg p-4 mx-auto">
            <div className="after:content-[''] after:bg-gray-300 after:block after:w-full after:h-[2px] after:left-0 after-bottom-0">
                <div className="flex p-4 gap-x-2">
                    <p>홈화면&gt;</p>
                    <p>커뮤니티&gt;</p>
                    <p>{data.category}</p>
                </div>
            </div>
            <div className='w-full p-4 shadow-xl'>
                <div className='flex justify-between pb-4'>
                    <div className="flex items-center gap-x-2 text-gray-400">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img className="block w-full" src={data.feedWriterProfileUrl ? `${NEXT_PUBLIC_API_URL}` + data.feedWriterProfileUrl : "/common/user/noProfile.png"} alt="userImg" />
                        </div>
                        <p>{data.inPublic === "Y" ? data.feedWriterId : "비공개"}</p>
                        <p> | </p>
                        <p>{formatDate(data.feedDate)}</p>
                    </div>
                    <div className={data.feedWriterId == user.userId ? "flex gap-4" : "hidden"}>
                        <Button text={"수정"} onClick={handleModSubmit} />
                        <Button text={"삭제"} onClick={handleDeleteSubmit} />
                    </div>
                </div>
                <div className="py-8 ">
                    {editorData && (
                        <CustomEditor readOnly={data.feedWriterId == user.userId ? false : true} value={editorData} initialData={data.feedContent} setData={setEditorData} />
                    )}
                </div>
                <div className="flex gap-x-4">
                    <div className="flex gap-1 cursor-pointer" onClick={handleLikeSubmit}>
                        <img src={loginUserIsLiked ? "/feed/fillHeart.png" : "/feed/emptyHeart.png"} alt="" />
                        {likeCount}
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
