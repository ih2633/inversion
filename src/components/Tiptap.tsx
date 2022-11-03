import { EditorContent, useEditor } from "@tiptap/react";
import Link from "next/link";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article";

export const Tiptap: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const { data: categorys } = trpc.category.getList.useQuery();
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose  p-7  focus:outline-none ",
      },
    },
  });

  const ctx = trpc.useContext();

  const mutation = articleOptimisticUpdates(trpc.article.addArticle, ctx);

  const onSubmit = (data) => {
    console.log(data);
    const content = JSON.stringify(editor.getJSON());
    console.log(content);
    const { title, category } = data;
    mutation.mutate({ title, content, category });
  };

  if (!editor) return null;

  return (
    <>
      <div className="">
        {mutation.isSuccess && (
          <div className="modal modal-open" id="my-modal-2">
            <div className="modal-box">
              <h3 className="text-lg font-bold">
                Congratulations random Internet user!
              </h3>
              <p className="py-4">
                You've been selected for a chance to get one year of
                subscription to use Wikipedia for free!
              </p>
              <div className="modal-action">
                <Link href="/articles" className="btn">
                  Yay!
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="ml-5">
          <div>
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select-bordered select w-full max-w-xs"
              {...register("category")}
            >
              <option disabled selected>
                select content
              </option>
              {categorys?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input-bordered input w-full max-w-xs"
              {...register("title")}
            />
          </div>
          <div className="flex ">
            <div className=" w-screen">
              <label className="label">
                <span className="label-text">Content</span>{" "}
              </label>
              <EditorContent
                className="h-screen  w-auto  overflow-y-scroll border-2"
                editor={editor}
              />
            </div>
            <div className="sticky top-10">
              <div className=" ml-5 mt-5 flex flex-col space-y-3">
                <button
                  className="h-12 w-24 rounded-xl border-2 border-gray-400"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  h1
                </button>
                <button
                  className="h-12 w-24 rounded-xl border-2 border-gray-400"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
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
                <button className="btn" onClick={handleSubmit(onSubmit)}>
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
