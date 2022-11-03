import { type NextPage } from "next";
import { useForm } from "react-hook-form";

import { trpc } from "@/utils/trpc";
import { articleOptimisticUpdates } from "@/utils/article";

const DeleteArticleButton = (props) => {
  const { handleSubmit } = useForm();
  const ctx = trpc.useContext();
  const mutation = articleOptimisticUpdates(trpc.article.delete, ctx);
  const onSubmit = () => {
    console.log(props.id);
    const id = props.id;
    mutation.mutate({ id });
  };
  return (
    <>
      <div className="dropdown-right dropdown">
        <label tabIndex={0} className="btn m-1">
          DELETE
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-boxbg-base-100 shadow"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <button className="btn-warning btn">delete</button>
          </form>
        </ul>
      </div>
    </>
  );
};

export default DeleteArticleButton;
