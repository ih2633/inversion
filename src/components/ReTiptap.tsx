import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react"

export const ReTiptap = (props: any) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-xl xl:prose-3xl tracking-wider  w-full m-auto p-8 focus:outline-none ",
      },
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
    content: props.content,
  });

  useEffect(() => {
    const contentHTML = editor?.getHTML();
    props.setContentHtml(contentHTML);
  });

  if (!editor) return null;

  return (
    <div className=" flex">
      <div className=" w-full">
        <label className="label">
          <span className="label-text">Content</span>{" "}
        </label>
        <EditorContent
          className="h-screen overflow-y-scroll border-2"
          editor={editor}
        />
      </div>
      <div className="mt-32 ml-6">
        <div className=" flex flex-col space-y-3">
          <button
            className="h-12 w-24 rounded-xl  border-2 border-gray-400"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            見出し
          </button>
          <button
            className="h-12 w-24 rounded-xl border-2 border-gray-400"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            リスト
          </button>
          <button
            className="h-12 w-24 rounded-xl border-2 border-gray-400"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            コードブロック
          </button>
          <button
            className="h-12 w-24 rounded-xl border-2 border-gray-400"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            打ち消し線
          </button>
          <button
            className="h-12 w-24 rounded-xl border-2 border-gray-400"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            斜体
          </button>
        </div>
      </div>
    </div>
  );
};
