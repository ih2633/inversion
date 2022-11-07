import { EditorContent, useEditor } from "@tiptap/react";
import { useState, useMemo } from "react";
import Link from "next/link";
import StarterKit from "@tiptap/starter-kit";
import { useForm, Controller } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article";

export const Tiptap: React.FC = () => {
  const { register, handleSubmit, control } = useForm({});

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
    console.log({ data })

    const content = editor?.getHTML();

    const { title, category, tag0, tag1, tag2, tag3, tag4, publish } = data;
    const sendTags = [tag0, tag1, tag2, tag3, tag4].filter((x) => Boolean(x));

    // const sendTags = []
    // tags.forEach((x) => {
    //     const tmpObj = {name: x};
    //     sendTags.push(tmpObj)

    // });
    // console.log(tags)
    console.log(sendTags);
    const categoryId = categoryCheck(categorys, category);
    console.log(categoryId);

    const noMatch = categoryId === undefined;
    if (noMatch) {
      throw new Error("categoryを入力してください");
    }

    const isOver = title.length > 0;
    if (isOver) {
      mutation.mutate({ title, content, categoryId, sendTags, publish });
    } else {
      // タイトル文字数のエラーいれる
      console.error("エラー：");
    }
  };

  const categoryCheck = (categorysArray, categoryId) => {
    const categorys = categorysArray
      .map((category) => {
        const id = category.id;
        return id;
      })
      .find((x) => x === categoryId);

    return categorys;
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
              <option disabled selected></option>
              {categorys?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex w-full items-end ">
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
            <div className="ml-7">
              <label className="label">
                <span className="label-text">Publish</span>
              </label>
              <Controller
                name="publish"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <input
                    {...field}
                    type="checkbox"
                    className="toggle h-10 w-16"
                  />
                )}
              />
            </div>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Tag</span>
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Tag"
                className="input-bordered input w-full max-w-xs"
                {...register("tag0")}
              />
              <input
                type="text"
                placeholder="Tag"
                className="input-bordered input w-full max-w-xs"
                {...register("tag1")}
              />
              <input
                type="text"
                placeholder="Tag"
                className="input-bordered input w-full max-w-xs"
                {...register("tag2")}
              />
              <input
                type="text"
                placeholder="Tag"
                className="input-bordered input w-full max-w-xs"
                {...register("tag3")}
              />
              <input
                type="text"
                placeholder="Tag"
                className="input-bordered input w-full max-w-xs"
                {...register("tag4")}
              />
            </div>
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
