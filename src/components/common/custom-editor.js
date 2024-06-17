// components/custom-editor.js

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'src/ckeditor5/build/ckeditor';

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        // 'link',
        // 'bulletedList',
        // 'numberedList',
        // '|',
        // 'outdent',
        // 'indent',
        '|',
        // 'imageUpload',
        'blockQuote',
        'insertTable',
        // 'mediaEmbed',
        'undo',
        'redo'
    ]
};

const editorConfigurationReply = {
    toolbar: [
    ]
};

function CustomEditor( props ) {
        return (
            <CKEditor
                editor={ Editor }
                config={ editorConfiguration }
                data={ props.initialData || ""}
                onChange={ (event, editor ) => {
                    const data = editor.getData();
                    props.setData(data)
                } }
            />
        )
}

export default CustomEditor;
