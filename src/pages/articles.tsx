import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import { trpc } from "../utils/trpc";
import { appRouter } from "@/server/trpc/router/_app";

import { articleOptimisticUpdates } from "@/utils/article";

import ArticleForm from "@/components/article/form";
import DeleteArticleButton from "@/components/article/deleteButton";
import Card from "@/components/article/Card";
import Navbar from "@/components/Navbar"


const list: NextPage = () => {
  const { data: articles } = trpc.article.getAllArticles.useQuery();
  console.log({ articles });

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-7 bg-gray-100">
        <div className="col-span-1">
          <div className="mt-24">

          </div>
        </div>
        <div className="col-span-4 border-x-2">
          <div className="m-12">
            <p className="m-3 prose prose-lg">新着記事</p>
            <div className="space-y-4">
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
        <div className="col-span-2">

        </div>

      </div>
    </>
  );
};

export default list;
