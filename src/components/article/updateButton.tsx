import { useForm } from "react-hook-form";

import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article";

const UpdateArticleButton = (props: any) => {
  const { register, handleSubmit } = useForm();
  const ctx = trpc.useContext();
  const mutation = articleOptimisticUpdates(trpc.article.update, ctx);
  const onSubmit = (data) => {
    console.log(props.id);
    const id = props.id;
    const { title, content, category } = data;
    mutation.mutate({ title, content, category, id });
  };
  const { data: categories } = trpc.category.getList.useQuery();
  return (
    <>
      <label htmlFor="my-modal" className="btn btn-success">
        Update
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Update</h3>
          <div className="mx-12">
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
                  {categories?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="modal-action mx-12 flex justify-between">
                <label htmlFor="my-modal" className=" btn-outline  btn">
                  cancel
                </label>
                <button
                  className="my-modal btn-outline btn btn-info ml-12"
                  type="submit"
                >
                  <label htmlFor="my-modal">submit</label>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateArticleButton;
