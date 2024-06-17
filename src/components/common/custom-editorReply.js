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
                toolbar: readOnly ? [] : undefined, // readOnly 모드일 때 툴바를 숨깁니다.
            }}
            disabled={readOnly}
            onReady={editor => {
                // readOnly 모드일 때 툴바 숨기기
                if (readOnly) {
                    editor.ui.view.toolbar.element.style.display = 'none';
                }
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
            }}
        />
    );
}

export default CustomEditorReply;
