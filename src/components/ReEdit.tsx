import { EditorContent, useEditor } from "@tiptap/react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Node } from "@tiptap/core";
import { tokenize } from "wakachigaki";
import StarterKit from "@tiptap/starter-kit";
import { useForm, Controller } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article";
import { v4 as uuidv4 } from "uuid";

export const ReEdit: React.FC = () => {
  const { register, handleSubmit, control } = useForm({});

  const { data: categories } = trpc.category.getList.useQuery();

  const editor = useEditor({
    extensions: [StarterKit],
    content:`<p>aaaaaaaaaaaaaaaaaaaaaaaaaaa</p>`,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-xl xl:prose-3xl tracking-wider  w-full m-auto p-8 focus:outline-none ",
      },
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
  });

  const ctx = trpc.useContext();

  const mutation = articleOptimisticUpdates(trpc.article.addArticle, ctx);

  const onSubmit = async (data) => {
    console.log({ data });

    const content2 = editor?.getHTML();

    let headingId = 0;

    const content = content2?.replace(/<h3>/g, () => {
      headingId = headingId + 1;
      return `<h3 id="heading${headingId}">`;
    }) as string;

    console.log({ content });
    console.log(typeof content);

    // const preSpritContent = content?.replace(/<.+?>/g, "") as string
    // console.log({ preSpritContent })

    // const wakachi = tokenize(preSpritContent)
    // const splitContent = wakachi.join(" ")

    const wakachi = tokenize(content);
    const preSpritContent = wakachi.join(" ");

    const splitContent = preSpritContent?.replace(/<.+?>/g, "") as string;

    console.log({ splitContent });

    const { title, category, tag0, tag1, tag2, tag3, tag4, publish } = data;
    const sendTags = [tag0, tag1, tag2, tag3, tag4].filter((x) => Boolean(x));

    const categoryId = categoryCheck(categories, category);

    const noMatch = categoryId === undefined;
    if (noMatch) {
      throw new Error("categoryを入力してください");
    }

    const isOver = title.length > 0;
    if (isOver) {
      mutation.mutate({
        title,
        content,
        categoryId,
        sendTags,
        publish,
        splitContent,
      });
    } else {
      // タイトル文字数のエラーいれる
      console.error("エラー：");
    }
  };

  const categoryCheck = (categoriesArray, categoryId) => {
    const categories = categoriesArray
      .map((category) => {
        const id = category.id;
        return id;
      })
      .find((x) => x === categoryId);

    return categories;
  };

  if (!editor) return null;

  return (
    <>
      <div className="w-full ">
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
              defaultValue=""
              className="select-bordered select w-full max-w-xs"
              {...register("category")}
            >
              {categories?.map((category) => {
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
                    className="toggle-success toggle h-10 w-16"
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
              <div className=" flex-col flex space-y-3">
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
