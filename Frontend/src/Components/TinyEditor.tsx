import { Editor } from "@tinymce/tinymce-react";

interface TinyEditorProps {
    value: string;
    onChange: (content: string) => void;
}

const TinyEditor = ({ value, onChange }: TinyEditorProps) => {
    return (
        <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={value}
            onEditorChange={(content) => onChange(content)}
            init={{
                height: 300,
                menubar: true,

                plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "table",
                    "code",
                    "fullscreen",
                ],

                toolbar:
                    "undo redo | blocks | " +
                    "bold italic underline | " +
                    "alignleft aligncenter alignright | " +
                    "bullist numlist | code",

                content_style: `
                    body {
                        font-family: 'Roboto', sans-serif;
                        font-size: 14px;
                        padding: 5px 10px;
                    }
                `,
            }}
        />
    );
};

export default TinyEditor;