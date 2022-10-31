import { type NextPage } from "next";
import superjson from "superjson";
import { trpc } from "../utils/trpc";
import { appRouter } from "@/server/trpc/router/_app";
import { useForm } from "react-hook-form";


const Articles: NextPage = () => {
  const { register, handleSubmit } = useForm();
    const mutation = trpc.article.addArticle.useMutation();
  const onSubmit = (data) => {
    console.log(data)
    const {title, content} = data
    mutation.mutate({title, content})

  }


  const { data: articles } = trpc.article.getAllArticles.useQuery();
  console.log(articles);
  console.log(Array.isArray(articles));

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

export default Articles;
