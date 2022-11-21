import { useState } from "react";
import Link from "next/link";
import { tokenize } from "wakachigaki";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article";
import { ReTiptap } from "./ReTiptap"
import type { EditArticleInfo } from "@/types/article"

type Props = {
  userId: string
  articleId: string
  publish: boolean
  title: string
  category: {id: string, name: string}
  content: string
  tags: Array<{name: string}>
}



export const ReEdit = (props: Props) => {
  const { register, handleSubmit, control  } = useForm<EditArticleInfo>({});
  const [contentHtml, setContentHtml] = useState("");

  const { data: categories } = trpc.category.getList.useQuery();

  const ctx = trpc.useContext();

  const mutation = articleOptimisticUpdates(trpc.article.updateArticle, ctx);

  const onSubmit: SubmitHandler<EditArticleInfo> = async (data) => {

    let headingId = 0;

    const content = contentHtml?.replace(/<h3>/g, () => {
      headingId = headingId + 1;
      return `<h3 id="heading${headingId}">`;
    }) as string;

    const wakachi = tokenize(content);
    const preSpritContent = wakachi.join(" ");

    const splitContent = preSpritContent?.replace(/<.+?>/g, "") as string;
    const { title, categoryId, tag0, tag1, tag2, tag3, tag4, publish } = data;
    const sendTags = [tag0, tag1, tag2, tag3, tag4].filter((x) => Boolean(x));

    const articleId = props.articleId;
    const userId = props.userId;

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
        articleId,
        userId,
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
              <h3 className="text-lg font-bold">更新完了!</h3>

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
              onSubmit={handleSubmit(onSubmit)}
            >
              投稿
            </button>
          </div>
          {props && (
            <div className="flex w-full items-end ">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input-bordered input w-full max-w-xs"
                  defaultValue={props.title}
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
                  defaultValue={props.publish}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      type="checkbox"
                      className="toggle-success toggle h-10 w-16"
                      defaultChecked={props.publish}
                    />
                  )}
                />
              </div>
            </div>
          )}
          {props && (
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Tag</span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Tag"
                  className="input-bordered input w-full max-w-xs"
                  defaultValue={props.tags[0]?.name}
                  {...register("tag0")}
                />
                <input
                  type="text"
                  placeholder="Tag"
                  className="input-bordered input w-full max-w-xs"
                  defaultValue={props.tags[1]?.name}
                  {...register("tag1")}
                />
                <input
                  type="text"
                  placeholder="Tag"
                  className="input-bordered input w-full max-w-xs"
                  defaultValue={props.tags[2]?.name}
                  {...register("tag2")}
                />
                <input
                  type="text"
                  placeholder="Tag"
                  className="input-bordered input w-full max-w-xs"
                  defaultValue={props.tags[3]?.name}
                  {...register("tag3")}
                />
                <input
                  type="text"
                  placeholder="Tag"
                  className="input-bordered input w-full max-w-xs"
                  defaultValue={props.tags[4]?.name}
                  {...register("tag4")}
                />
              </div>
            </div>
          )}
          {props && (
            <ReTiptap content={props.content} setContentHtml={setContentHtml} />
          )}
        </div>
      </div>
    </>
  );
};
