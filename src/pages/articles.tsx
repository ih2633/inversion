import { type NextPage } from "next";
import superjson from "superjson";
import { trpc } from "@/utils/trpc";
import { appRouter } from "@/server/trpc/router/_app";
import { useForm } from "react-hook-form";

const list: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const mutation = trpc.article.addArticle.useMutation();
  const onSubmit = (data) => {
    console.log(data);
    const { title, content } = data;
    mutation.mutate({ title, content });
  };

  const { data: articles } = trpc.article.getAllArticles.useQuery();
  console.log({ articles });

  const { data: categorys } = trpc.category.getList.useQuery();
  console.log(categorys);

  return (
    <>
      <div className="m-12">
        <p>articles path</p>
        <ul>
          {articles?.map((article) => {
            return (
              <li className="ml-5 mt-4" key={article.id}>
                <p>{article.title}</p>
                <p>{article.content}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-24">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="category-select">SetCategory</label>
              <select className="border-4" name="categorys" id="category-select" {...register("category")}>
                {categorys?.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <input className="border-4" id="title" {...register("title")} />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <input
                className="border-4"
                id="content"
                {...register("content")}
              />
            </div>
            <button className="border-4" type="submit">
              送信
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default list;
