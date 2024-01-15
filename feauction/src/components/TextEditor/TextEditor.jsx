import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';
import './TextEditor.scss';

const config = {
    buttons: ['bold', 'italic', 'link', 'unlink', 'underline', 'source'],
};
const plugin = {
    limitWords: 10,
    limitChars: 10,
    limitHTML: true,
};

const TextEditor = ({ initialValue, getValue }) => {
    const editor = useRef(null);
    return (
        <JoditEditor
            ref={editor}
            value={initialValue}
            config={config}
            tabIndex={1}
            plugins={plugin}
            onChange={(newContent) => {
                return getValue(newContent);
            }}
        />
    );
};

export default TextEditor;
