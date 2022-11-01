import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import { trpc } from "../utils/trpc";
import { appRouter } from "@/server/trpc/router/_app";

import { articleOptimisticUpdates } from "@/utils/article";

import ArticleForm from "@/components/article/form";
import DeleteArticleButton from "@/components/article/deleteButton";

const list: NextPage = () => {

  const { data: articles } = trpc.article.getAllArticles.useQuery();
  console.log({ articles });

  return (
    <>
      <div className="flex mx-32">
        <div className="mt-24">
          <ArticleForm />
        </div>
        <div className="m-12">
          <p>articles path</p>
          <ul>
            {articles?.map((article) => {
              return (
                <li className="ml-5 mt-4" key={article.id}>
                  <p>{article.title}</p>
                  <p>{article.content}</p>
                  <DeleteArticleButton id={article.id} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default list;
