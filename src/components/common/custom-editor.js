// components/custom-editor.js

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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


const CustomEditor = ({ value, initialData, setData, readOnly, placeholder } ) => {
        return (
            <CKEditor
            editor={ClassicEditor}
            data={initialData || ""}
            config={{
                toolbar: readOnly ? [] : editorConfiguration.toolbar,
                placeholder: placeholder,
            }}
            disabled={readOnly}
            onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
            }}
        />
        )
}

export default CustomEditor;
