import { type NextPage } from "next";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import UserArticle from "@/components/article/UserArticles";
import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";

const UserPage: NextPage = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { data: session, status } = useSession();
  
  const userId = router.query.userId as string;
  const sessionId = session?.user.id;

  const { data: user, isSuccess } = trpc.user.getUserPublishArticles.useQuery(
    { userId },
    { enabled: router.isReady }
  );
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
    <main className="h-screen ">
      <section className="h-screen bg-slate-50 pt-16">
        <div className="mx-auto w-4/5 px-4">
          <div className="relative mb-6 mt-16 flex h-full w-full min-w-0 flex-col break-words rounded-lg bg-white pb-12 shadow-xl">
            <div className="relative px-6">
              {isAuth ? (
                <div className="absolute top-3 right-0 mr-6 flex space-x-12">
                  <Link href={`./${userId}/setting`}>
                    <div className="rounded-xl  px-3 text-slate-500 hover:bg-gray-200  hover:text-slate-800">
                      <AiOutlineSetting className="h-12 w-12" />
                    </div>
                  </Link>
                  <button
                    className="btn-secondary btn normal-case "
                    onClick={() => signOut()}
                  >
                    SignOut
                  </button>
                </div>
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
                    {/* kokoniireru */}
                    {isSuccess ? (
                      <div className=" space-y-3 text-center">
                        {isDraft && draftSuccess
                          ? draftArticle?.articles.map((article) => {
                              return (
                                <div key={article.id} className=" ">
                                  <div className=" flex justify-center">
                                    <UserArticle article={article} isAuth={isAuth}/>
                                  </div>
                                </div>
                              );
                            })
                          : user?.articles.map((article) => {
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
    </main>
  );
};

export default UserPage;
