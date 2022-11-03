import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import { trpc } from "../utils/trpc";
import { appRouter } from "@/server/trpc/router/_app";

import { articleOptimisticUpdates } from "@/utils/article";

import ArticleForm from "@/components/article/form";
import DeleteArticleButton from "@/components/article/deleteButton";
import Card from "@/components/article/Card";

const list: NextPage = () => {
  const { data: articles } = trpc.article.getAllArticles.useQuery();
  console.log({ articles });

  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1">
          <div className="mt-24">
            <ArticleForm />
          </div>
        </div>
        <div className="col-span-4">
          <div className="m-12">
            <p>articles path</p>
            <div>
              {articles?.map((article) => {
                return (
                  <>
                    <Card article={article} />
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-blue-300">

        </div>
      </div>
    </>
  );
};

export default list;
