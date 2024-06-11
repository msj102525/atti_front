import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '../common/Button';
import { postFeed } from '@/pages/api/feed/feed.js';

const CustomEditor = dynamic(() => {
    return import('../../components/common/custom-editor');
}, { ssr: false });

let user = {
    userId: "문승종"
}

export default function FeedWriteForm(props) {

    const [currentDate, setCurrentDate] = useState("");
    const [editorData, setEditorData] = useState("");

    const [formData, setFormData] = useState({
        userId: user.userId,
        feedContent: "",
        category: "",
        isPublic: "",
    });

    const handleEditorChange = (data) => {
        setEditorData(data);
    };
    
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString();
        setCurrentDate(formattedDate);
    }, []);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            feedContent: editorData,
            category: props.category
        }));
    }, [editorData, props.category]);

    useEffect(() => {
        if (formData.isPublic === "Y" || formData.isPublic === "N") {
            postFeed(formData);
        }
        
    }, [formData]);

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
                <div className="border flex">
                    <img className="" src="#" alt="profile-img" />
                    <p>{user.userId}</p>
                    <p className='pl-2 pr-2'>|</p>
                    <p>{currentDate}</p>
                </div>
                <div className="flex gap-4">
                    <Button text={"등록"} onClick={publicHandleSubmit} />
                    <Button text={"비공개"} onClick={privateHandleSubmit} />
                </div>
            </div>
            <div className="pb-4">
                <CustomEditor value={editorData} setData={setEditorData} onChange={handleEditorChange} />
            </div>
            <span className='p-1 border text-gray-500'>#{props.category}</span>
        </div>
    );
}