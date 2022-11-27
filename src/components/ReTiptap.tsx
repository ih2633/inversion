import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, type Dispatch, type SetStateAction } from "react"

type Props = {
  setContentHtml: Dispatch<SetStateAction<string>>
  content: string
}

export const ReTiptap = (props: Props) => {
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
    const contentHTML = editor?.getHTML() as SetStateAction<string>;
    props.setContentHtml(contentHTML);
  });

  if (!editor) return null;

  return (
    <div className="md:flex">
      <div className=" w-full">
        <label className="label">
          <span className="label-text">Content</span>{" "}
        </label>
        <EditorContent
          className="h-80 overflow-y-scroll border-2 md:h-screen"
          editor={editor}
        />
      </div>
      <div className="mt-8 ml-6 md:mt-32">
        <div className=" flex space-x-3 md:flex-col md:space-y-3">
          <button
            className="btn-outline btn w-24"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            見出し
          </button>
          <button
            className="btn-outline btn w-24"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            リスト
          </button>
        </div>
      </div>
    </div>
  );
};
