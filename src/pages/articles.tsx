import { type NextPage } from "next";
import Link from "next/link"
import { trpc } from "@/utils/trpc";
import ArticleForm from "@/components/article/form";
import DeleteArticleButton from "@/components/article/deleteButton";
import UpdateArticleButton from "@/components/article/updateButton";

const list: NextPage = () => {
  const { data: articles } = trpc.article.getAllArticles.useQuery();
  console.log({ articles });

  return (
    <>
      <div className="mx-32 flex">
        <div className="mt-24">
          <ArticleForm />
        </div>
        <div className="m-12">
          <p>articles path</p>
          <div className="space-y-5">
            {articles?.map((article) => {
              return (
                <div key={article.id}>
                  <article className="container w-96 rounded-2xl bg-white p-5 shadow-2xl">
                    <Link href={`/article/${article.id}`}>
                      <h1 className="font-bold text-yellow-500">
                        {article.title}
                      </h1>
                    </Link>
                    <h6 className="mb-5 text-sm text-gray-300">
                      {article.createdAt.toDateString()}
                    </h6>
                    <p>{article.id}</p>
                    <div className="flex w-full justify-between">
                      <UpdateArticleButton id={article.id} />
                      <DeleteArticleButton id={article.id} />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default list;
