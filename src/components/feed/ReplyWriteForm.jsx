import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const CustomEditorReply = dynamic(() => {
    return import('@/components/common/custom-editorReply');
}, { ssr: false });

export default function ReplyWirteForm() {
    const [editorDataReply, setEditorDataReply] = useState("");

    return (
        <div className="border p-4">
            <CustomEditorReply value={editorDataReply} setData={setEditorDataReply} />
        </div>
    )
}