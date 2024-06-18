import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '../common/Button';

const CustomEditorReply = dynamic(() => {
    return import('@/components/common/custom-editorReply');
}, { ssr: false });

export default function ReplyWirteForm() {
    const [editorDataReply, setEditorDataReply] = useState("");

    return (
        <div className="p-2">
            <div className="flex gap-4 justify-end p-2">
                <Button text={"수정"} />
                <Button text={"삭제"} />
            </div>
            <CustomEditorReply className="border" value={editorDataReply} readOnly={false} setData={setEditorDataReply} />
        </div>
    )
}