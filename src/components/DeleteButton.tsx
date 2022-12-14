import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { trpc } from "@/utils/trpc";
import { userArticleOptimisticUpdates } from "@/utils/article";
import type {AuthArticleInfo} from "@/types/article"

const DeleteArticleButton = (props: AuthArticleInfo) => {
  const { handleSubmit } = useForm();
  const ctx = trpc.useContext()
  const mutation = userArticleOptimisticUpdates(trpc.article.delete, ctx);
  const onSubmit = () => {
    const {userId, articleId} = props;
    mutation.mutate({ userId, articleId });
  };
  return (
    <>
      <label htmlFor="my-modal">
        <AiOutlineDelete className="h-8 w-8" />
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">本当に削除しますか</h3>
          <div className="mx-12 flex justify-between">
            <form onSubmit={handleSubmit(onSubmit)}>
              <button className="btn btn-warning mt-5">delete</button>
            </form>
            {mutation.isLoading &&
              <div className="animate-spin h-10 w-10 border-4 border-info rounded-full border-t-transparent"></div>
            }
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
