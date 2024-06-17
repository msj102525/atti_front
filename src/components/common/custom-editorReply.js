// components/custom-editor.js

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'src/ckeditor5/build/ckeditor';



const editorConfigurationReply = {
    toolbar: [
    ],
    placeholder: "댓글을 입력하세요"
};



function CustomEditorReply( props ) {
    return (
        <CKEditor
            editor={ Editor }
            config={ editorConfigurationReply }
            data={ props.initialData || ""}
            onChange={ (event, editor ) => {
                const data = editor.getData();
                props.setData(data)
            } }
        />
    )
}

export default CustomEditorReply;
