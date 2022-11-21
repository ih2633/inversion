import { useState, useMemo } from "react";
import Link from "next/link";
import { Node } from "@tiptap/core";
import { tokenize } from "wakachigaki";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "./Editor"
import type { EditArticleInfo } from "@/types/article"

export const Tiptap = () => {
  const { register, handleSubmit, control } = useForm<EditArticleInfo>({});
  const [contentHtml, setContentHtml] = useState("")

  const { data: categories } = trpc.category.getList.useQuery();

  const ctx = trpc.useContext();

  const mutation = articleOptimisticUpdates(trpc.article.addArticle, ctx);

  const onSubmit: SubmitHandler<EditArticleInfo> = async (data) => {
    console.log({ data });

    let headingId = 0;

    const content = contentHtml?.replace(/<h3>/g, () => {
      headingId = headingId + 1;
      return `<h3 id="heading${headingId}">`;
    }) as string;

    console.log({ content });
    console.log(typeof content);

    const wakachi = tokenize(content);
    const preSpritContent = wakachi.join(" ");

    const splitContent = preSpritContent?.replace(/<.+?>/g, "") as string;

    console.log({ splitContent });

    const { title, categoryId, tag0, tag1, tag2, tag3, tag4, publish } = data;
    const sendTags = [tag0, tag1, tag2, tag3, tag4].filter((x) => Boolean(x));

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

  return (
    <>
      <div className="w-full ">
        {mutation.isSuccess && (
          <div className="modal modal-open" id="my-modal-2">
            <div className="modal-box">
              <h3 className="text-lg font-bold">投稿完了!</h3>
              <div className="modal-action">
                <Link href="/" className="btn">
                  HOME
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="ml-5 ">
          <div className="flex items-end justify-between ">
            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              {categories && (
                <select
                  defaultValue={categories[0]?.name}
                  className="select-bordered select w-full max-w-xs"
                  {...register("categoryId")}
                >
                  {categories?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <button
              className="btn mr-24 border-8 border-teal-300 bg-teal-300 font-bold text-gray-600 shadow-xl  hover:border-teal-400 hover:bg-teal-400"
              onClick={handleSubmit(onSubmit)}
            >
              投稿
            </button>
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
                render={({ field }: any) => (
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
          <Editor setContentHtml={setContentHtml} />
        </div>
      </div>
    </>
  );
};
