import { type NextPage } from "next";
import { useForm } from "react-hook-form";

import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article"


const DeleteArticleButton = (props) => {
  const { handleSubmit } = useForm();
  const ctx = trpc.useContext()

  const mutation = articleOptimisticUpdates(trpc.article.delete, ctx);
  const onSubmit = () => {
    console.log(props.id);
    const id = props.id;
    mutation.mutate({ id });
  };
  return (
    <>
      <label htmlFor="my-modal" className="btn">
        open modal
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">本当に削除しますか</h3>
          <div className="flex justify-between mx-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <button className="btn-warning btn mt-5">delete</button>
            </form>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                cancel
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteArticleButton;
