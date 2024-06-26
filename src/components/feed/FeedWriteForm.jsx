import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '../common/Button';
import { postFeed } from '@/api/feed/feed.js';
import { useRouter } from 'next/router';

const CustomEditor = dynamic(() => {
    return import('@/components/common/custom-editor');
}, { ssr: false });



export default function FeedWriteForm({ user, category }) {
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [editorData, setEditorData] = useState("");

    const [formData, setFormData] = useState({
        feedContent: "",
        category: "일반 고민",
        inPublic: "",
    });

    const handleEditorChange = (data) => {
        setEditorData(data);
    };


    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            feedContent: editorData,
            category: category
        }));
    }, [editorData, category]);

    useEffect(() => {
        if (formData.inPublic.length > 0) {
            postFeed(formData)
                .then(res => {
                    if (res.status === 201) {
                        router.push("/feed");
                    }
                })
                .catch(err => {
                    console.error("피드 등록 실패:", err);
                });
        }
    }, [formData.inPublic, router]);

    const publicHandleSubmit = (e) => {
        e.preventDefault();
        if (formData.feedContent.length > 10) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                inPublic: "Y"
            }));
        } else {
            alert("고민을 10자 이상 적어주세요!");
        }

    };

    const privateHandleSubmit = (e) => {
        e.preventDefault();
        if (formData.feedContent.length > 10) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                inPublic: "N"
            }));
        } else {
            alert("고민을 10자 이상 적어주세요!");
        }
    };


    return (
        <div className='w-full p-4 shadow-xl'>
            <div className='flex justify-between pb-4'>
                <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img className="block w-full" src={user.userProfileUrl ? `${NEXT_PUBLIC_API_URL}` + user.userProfileUrl : "/common/user/noProfile.png"} alt="userImg" />
                    </div>
                    <p>{user.userId}</p>
                </div>
                <div className={`flex gap-4`}>
                    <Button text={"등록"} onClick={publicHandleSubmit} />
                    <Button text={"비공개"} onClick={privateHandleSubmit} />
                </div>
            </div>
            <div className="py-8">
                <CustomEditor placeholder={"고민 작성"} value={editorData} setData={setEditorData} onChange={handleEditorChange} readOnly={false} />
            </div>
            <span className='p-1 border text-gray-500'>#{formData.category !== "" ? formData.category : "일반 고민"}</span>
        </div>
    );
}