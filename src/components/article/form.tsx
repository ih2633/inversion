import { useForm } from "react-hook-form";

import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article";

const ArticleForm = () => {
  const {register, handleSubmit } = useForm();


  const { data: categorys } = trpc.category.getList.useQuery();
  console.log({ categorys });

  const ctx = trpc.useContext();

  const mutation = articleOptimisticUpdates(trpc.article.addArticle, ctx);
  const onSubmit = (data) => {
    console.log(data);
    const { title, content, category } = data;
    mutation.mutate({ title, content, category });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <input
          type="text"
          placeholder="Category"
          className="input-bordered input w-full max-w-xs"
          {...register("content")}
        />
      </div>
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
      <div className="text-right">
        <button className="btn-outline btn-info btn mt-5" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
