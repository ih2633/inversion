import { useForm } from "react-hook-form";
import { useEffect } from "react"

import { trpc } from "@/utils/trpc";

const ArticleForm = () => {
  const { register, handleSubmit, watch } = useForm();

  const { data: categories } = trpc.category.getList.useQuery();
  console.log({ categories });


  const onSubmit = (data) => {
    console.log(data);
    const { search } = data;
    const { data: article, isSuccess } = trpc.article.searchWordForContent.useQuery({search})
    if (isSuccess) { console.log(article) }
  
  };



  return (
    <>
      <div className="w-screen">
        <div className="mx-auto w-4/5 ">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="mx-auto w-4/5 flex items-end space-x-4">
              <div className="form-control w-full max-w-xs  ">
                <label className="label">
                  <span className="label-text">Search</span>
                </label>
                <input
                  type="text"
                  placeholder="Search"
                  className="input-bordered input w-full max-w-xs"
                  {...register("search")}
                />
              </div>
              <button className="btn-outline btn-info btn" type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ArticleForm;
