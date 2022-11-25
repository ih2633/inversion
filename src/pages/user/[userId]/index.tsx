import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useState, useEffect } from "react";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import UserArticle from "@/components/article/UserArticles";
import { AiOutlineSetting, AiOutlineMore } from "react-icons/ai";
import Link from "next/link";
import { appRouter } from '@/server/trpc/router/_app';
import superjson from 'superjson';
import type { UserWithArticleRelation } from "@/types/user"
import { prisma } from "@/server/db/client";
import { UserMenu } from "@/components/UserMenu";

export async function getStaticProps(
  context: GetStaticPropsContext<{ userId: string }>
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });
  const userId = context.params?.userId as string;

  await ssg.user.getUserPublishArticles.prefetch({ userId })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId,
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: users?.map((user) => ({
      params: {
        userId: user.id,
      },
    })),
    fallback: 'blocking',
  };
}

const UserPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { data: session, status } = useSession();

  const { userId } = props;

  const sessionId = session?.user.id;

  const { data: user, isSuccess } = trpc.user.getUserPublishArticles.useQuery({ userId });
  const { data: draftArticle, isSuccess: draftSuccess } =
    trpc.user.getUserAllArticles.useQuery({ userId }, { enabled: isAuth });

  useEffect(() => {
    if (status !== "loading") {
      const isAuth = sessionId === userId;
      setIsAuth(isAuth);
    }
  }, [userId, status, sessionId]);

  if (status === "loading") {
    return <main>Loading...</main>;
  }


  const showDraft = () => {
    setIsDraft(true);
  };

  const showPublish = () => {
    setIsDraft(false);
  };

  return (
    <section className="min-h-screen bg-slate-50 md:pt-16 w-full">
      <div className="mx-auto md:w-4/5 md:px-4">
        <div className="relative md:mb-6 md:mt-16 flex h-full min-w-0 flex-col break-words rounded-lg bg-white md:pb-12 shadow-xl">
          <div className="relative px-6">
            {isAuth ? (
              <>
                <UserMenu userId={userId}/>
              </>

            ) : (
              <div></div>
            )}
            <div className="mt-12 flex flex-wrap justify-center">
              <div className="flex w-full justify-center px-4 ">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    {user?.image && isSuccess && (
                      <Image
                        alt="..."
                        src={user.image}
                        className="max-w-150-px absolute h-auto rounded-full border-none align-middle shadow-xl"
                        fill={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-5  pb-6 text-center">
              <h3 className="mb-2 text-xl font-semibold leading-normal text-slate-700">
                {isSuccess && user?.profile?.profileUserName
                  ? user?.profile.profileUserName
                  : user?.name}
              </h3>
              <div className="mb-2 mt-3 text-slate-600">
                <i className="fas fa-briefcase mr-2 text-lg text-slate-400"></i>
                Profile
              </div>
              <div className="mb-2 text-slate-600">
                <i className="fas fa-university mr-2 text-lg text-slate-400"></i>
                {isSuccess && user?.profile && user?.profile.profileText}
              </div>
            </div>
            {isAuth && (
              <div className="tabs font-bold">
                <button
                  onClick={showPublish}
                  className={`tab tab-bordered ${!isDraft && "tab-active"}`}
                >
                  公開済み
                </button>
                <button
                  onClick={showDraft}
                  className={`tab tab-bordered ${isDraft && "tab-active"}`}
                >
                  下書き
                </button>
              </div>
            )}
            <div className=" mt-4 text-center">
              <div className="flex flex-wrap ">
                <div className="w-full px-4 ">
                  {isSuccess ? (
                    <div className=" space-y-3 text-center">
                      {isDraft && draftSuccess
                        ? draftArticle?.articles.map((article: UserWithArticleRelation) => {
                          return (
                            <div key={article.id} className=" ">
                              <div className=" flex justify-center">
                                <UserArticle article={article} isAuth={isAuth} />
                              </div>
                            </div>
                          );
                        })
                        : user?.articles.map((article: UserWithArticleRelation) => {
                          return (
                            <div key={article.id} className=" ">
                              <div className=" flex justify-center">
                                <UserArticle article={article} isAuth={isAuth} />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
