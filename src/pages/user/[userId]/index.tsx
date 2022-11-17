import { type NextPage } from "next";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import UserArticle from "@/components/article/UserArticles";
import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link"



const UserPage: NextPage = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false)
  const [isDraft, setIsDraft] = useState(false)

  const { data: session, status } = useSession();
  const userId = router.query.userId as string;
  const sessionId = session?.user.id

  const { data: user, isSuccess } = trpc.user.getUserPublishArticles.useQuery({ userId });
  const { data: draftArticle, isSuccess: draftSuccess } = trpc.user.getUserAllArticles.useQuery({ userId }, { enabled: isAuth });

  useEffect(() => {
    if (status !== "loading") {
      const isAuth = sessionId === userId
      setIsAuth(isAuth)
    }
  }, [userId, status, sessionId])
  
  if (status === "loading") {
    return <main>Loading...</main>
  }

  console.log({ draftArticle })
  
  const showDraft = () => {
    setIsDraft(true)
    console.log({isDraft})
  }

  const showPublish = () => {
    setIsDraft(false)
  }

  return (
    <main className="h-screen ">
      <section className="h-screen bg-slate-50 pt-16">
        <div className="mx-auto w-4/5 px-4">
          <div className="relative mb-6 mt-16 flex w-full min-w-0 flex-col break-words rounded-lg bg-white h-full pb-12 shadow-xl">
            <div className="px-6 relative">
              {isAuth ? <div className="absolute top-3 right-0 flex space-x-12 mr-6">
                <Link href={`./${userId}/setting`}>
                  <div className="px-3  text-slate-500 hover:text-slate-800 hover:bg-gray-200  rounded-xl">
                    <AiOutlineSetting className="w-12 h-12" /></div>
                </Link>
                <button className="btn btn-secondary normal-case " onClick={() => signOut()}>SignOut</button>
              </div> : <div></div>}
              <div className="flex flex-wrap justify-center mt-12">
                <div className="flex w-full justify-center px-4 ">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <Image
                        alt="..."
                        src="https://avatars.githubusercontent.com/u/81939854?v=4"
                        className="max-w-150-px absolute h-auto rounded-full border-none align-middle shadow-xl"
                        fill={true}
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div className=" text-center  pb-6 mt-5">
                <h3 className="text-slate-700 mb-2 text-xl font-semibold leading-normal">
                  {isSuccess && user?.profile?.profileUserName ? user?.profile.profileUserName : user?.name}
                </h3>
                <div className="text-slate-600 mb-2 mt-3">
                  <i className="fas fa-briefcase text-slate-400 mr-2 text-lg"></i>
                  Profile
                </div>
                <div className="text-slate-600 mb-2">
                  <i className="fas fa-university text-slate-400 mr-2 text-lg"></i>
                  {isSuccess && user?.profile && user?.profile.profileText}
                </div>
              </div>
              {isAuth && <div className="tabs font-bold">
                <button onClick={showPublish} className={`tab tab-bordered ${!isDraft && "tab-active"}`}>公開済み</button>
                <button onClick={showDraft} className={`tab tab-bordered ${isDraft && "tab-active"}`}>下書き</button>
              </div>} 
              <div className=" mt-4 text-center">
                <div className="flex flex-wrap ">
                  <div className="w-full px-4 ">
                    {/* kokoniireru */}
                    {isSuccess ? (
                      <div className=" space-y-3 text-center">
                        
                        {isDraft && draftSuccess ? draftArticle?.articles.map((article) => {
                          return (
                            <div key={article.id} className=" ">
                              <div className=" flex justify-center">
                                <UserArticle article={article} />
                              </div>
                            </div>
                          );
                        }) : user?.articles.map((article) => {
                          return (
                            <div key={article.id} className=" ">
                              <div className=" flex justify-center">
                                <UserArticle article={article} />
                              </div>
                            </div>
                          );
                        }) } 

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

