import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '../common/Button';
import { postFeed } from '@/api/feed/feed.js';

const CustomEditor = dynamic(() => {
    return import('@/components/common/custom-editor');
}, { ssr: false });

let user = {
    userId: "user01",
    userProfileUrl: "#"
}

export default function FeedWriteForm(props) {

    const [editorData, setEditorData] = useState("");

    const [formData, setFormData] = useState({
        userId: user.userId,
        feedContent: "",
        category: "일반 고민",
        isPublic: "",
    });

    const handleEditorChange = (data) => {
        setEditorData(data);
    };



    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            feedContent: editorData,
            category: props.category
        }));
    }, [editorData, props.category]);

    useEffect(() => {
        if(formData.isPublic.length > 0) {
            postFeed(formData)
        }

    }, [formData.isPublic]);

    const publicHandleSubmit = (e) => {
        e.preventDefault();
        setFormData((prevFormData) => ({
            ...prevFormData,
            isPublic: "Y"
        }));
    };

    const privateHandleSubmit = (e) => {
        e.preventDefault();
        setFormData((prevFormData) => ({
            ...prevFormData,
            isPublic: "N"
        }));
    };


    return (
        <div className='w-4/5 p-4 shadow-xl'>
            <div className='flex justify-between pb-4'>
                <div className="border flex items-center gap-2">
                    <div className="border w-10 h-10 rounded-full overflow-hidden">
                        {/* <img className="block w-full" src={user.userProfileUrl} alt="userImg" /> */}
                        <img className="block w-full" src={"#"} alt="userImg" />
                    </div>
                    <p>{user.userId}</p>
                </div>
                <div className="flex gap-4">
                    <Button text={"등록"} onClick={publicHandleSubmit} />
                    <Button text={"비공개"} onClick={privateHandleSubmit} />
                </div>
            </div>
            <div className="pb-4">
                <CustomEditor value={editorData} setData={setEditorData} onChange={handleEditorChange} />
            </div>
            <span className='p-1 border text-gray-500'>#{formData.category != "" ? formData.category : "일반 고민"}</span>
            {/* <span className='p-1 border text-gray-500'>#{formData.category}</span> */}
        </div>
    );
}