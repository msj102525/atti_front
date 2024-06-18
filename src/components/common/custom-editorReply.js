import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CustomEditorReply = ({ value, initialData, setData, readOnly }) => {
    useEffect(() => {
        // CKEditor 인스턴스에 접근해서 readOnly 모드 설정
        const editorInstance = document.querySelector('.ck-editor__editable');
        if (editorInstance) {
            editorInstance.contentEditable = !readOnly;
        }
    }, [readOnly]);

    return (
        <CKEditor
            editor={ClassicEditor}
            data={initialData || ""}
            config={{
                toolbar: readOnly ? [] : undefined,
            }}
            disabled={readOnly}
            onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
            }}
        />
    );
}

export default CustomEditorReply;
