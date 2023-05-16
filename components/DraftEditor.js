import "@toast-ui/editor/dist/toastui-editor.css";
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

export default function DraftEditor({ initialValue, onChange }) {
    const editorRef = React.createRef();

    function handleChange() {
        const md = editorRef?.current
            ? editorRef?.current.getInstance().getMarkdown()
            : "";
        onChange(md);
    }

    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme:theme;

    useEffect(() => {
        const toggleDarkMode = () => {
            let el = document.querySelector(".toastui-editor-defaultUI");
            if (currentTheme === "dark") {
                el?.classList.add("toastui-editor-dark");
            } else {
                el?.classList.remove("toastui-editor-dark");
            }
        };
        toggleDarkMode();
    }, [currentTheme]);

return (
    <Editor
        height="600px"
        initialEditType="wysiwyg"
        initialValue={initialValue}
        onChange={handleChange}
        previewStyle="vertical"
        ref={editorRef}
        useCommandShortcut={true}
        theme={currentTheme}
    />
  );
}
