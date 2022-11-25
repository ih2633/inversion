import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import ReactHtmlParser from "react-html-parser";
import { trpc } from "@/utils/trpc";
import { appRouter } from "@/server/trpc/router/_app";
import Toc from "@/components/Toc";
import UserCard from "@/components/UserCard";
import { prisma } from "@/server/db/client";
import superjson from "superjson";

export async function getStaticProps(
  context: GetStaticPropsContext<{ articleId: string }>
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });
  const articleId = context.params?.articleId as string;

  await ssg.article.getArticleById.prefetch({ articleId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      articleId,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: articles?.map((x: { id: string }) => ({
      params: {
        articleId: x.id,
      },
    })),
    fallback: "blocking",
  };
};

const Article = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { articleId } = props;
  const { data: article } = trpc.article.getArticleById.useQuery({articleId});

  const createdAt = article?.createdAt.toLocaleDateString();
  const updatedAt = article?.updatedAt.toLocaleDateString();

  const isSkill = article?.category?.name === "Skill";

  return (
    <>
      <div className="min-h-screen w-screen bg-violet-50 text-gray-700">
        <div className=" container mx-auto">
          <div className="mx-auto">
            {article && (
              <>
                <p className="p-7 text-center text-4xl font-extrabold break-words whitespace-normal truncate h-28">
                  {article.title}
                </p>
              </>
            )}
            <div className="mt-3 grid lg:grid-cols-6">
              <div className="col-span-4 w-full">
                {article ? (
                  <>
                    <div className=" mx-auto w-full whitespace-pre-wrap break-words rounded-2xl bg-white p-8 focus:outline-none">
                      <div className="flex items-center justify-between">
                        <div
                          className={`${
                            isSkill ? "badge-primary" : "badge-secondary"
                          } badge badge-outline h-8 w-20`}
                        >
                          {article?.category?.name}
                        </div>
                        <div className="space-y-2 text-gray-400 ">
                          <p className="">投稿日: {createdAt}</p>
                          <p className="">更新日: {updatedAt}</p>
                        </div>
                      </div>
                      <div className=" prose-sm prose tracking-wider sm:prose lg:prose-xl xl:prose-3xl">
                        <div className="flex space-x-2 text-gray-400">
                          {article.tags.map((x: { name: string }) => {
                            return <p key={x.name}>#{x.name}</p>;
                          })}
                        </div>
                        <div className="blogContents">
                          {ReactHtmlParser(article.content)}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-32 flex justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-info border-t-transparent"></div>
                  </div>
                )}
              </div>
              <div className="md:col-span-2 md:mx-4 w-full md:grid hidden ">
                {article && (
                  <div className="md:sticky md:top-10">
                    <UserCard user={article.user} />
                    <Toc />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
