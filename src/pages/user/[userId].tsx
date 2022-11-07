import { type NextPage } from "next";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import UserArticle from "@/components/article/UserArticles";

const Article: NextPage = () => {
  const router = useRouter();

  const { userId } = router.query;
  console.log(userId);

  const { data: user, isSuccess } = trpc.user.getMyArticles.useQuery({
    id: userId as string,
  });

  console.log(user?.articles);
  console.log(user?.image);
  return (
    <div className="h-screen">
      <section className="bg-slate-50 pt-16">
        <div className="mx-auto w-full border-2 px-4">
          <div className="relative mb-6 mt-16 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
            <div className="px-6">
              <div className="flex flex-wrap justify-center border-2">
                <div className="flex w-full justify-center px-4 ">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <Image
                        alt="..."
                        src="https://avatars.githubusercontent.com/u/81939854?v=4"
                        className="max-w-150-px absolute -ml-2 h-auto rounded-full border-none align-middle shadow-xl"
                        fill={true}
                      />
                    </div>
                  </div>
                </div>
                <div className=" ml-6 w-full px-4 text-center">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                        22
                      </span>
                      <span className="text-blueGray-400 text-sm">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                        10
                      </span>
                      <span className="text-blueGray-400 text-sm">Photos</span>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                        89
                      </span>
                      <span className="text-blueGray-400 text-sm">
                        Comments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-blueGray-700 mb-2 mb-2 text-xl font-semibold leading-normal">
                  {user?.name}
                </h3>
                <div className="text-blueGray-400 mt-0 mb-2 text-sm font-bold uppercase leading-normal">
                  <i className="fas fa-map-marker-alt text-blueGray-400 text-lg"></i>
                  所属
                </div>
                <div className="text-blueGray-600 mb-2 mt-3">
                  <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                  自己紹介
                </div>
                <div className="text-blueGray-600 mb-2">
                  <i className="fas fa-university text-blueGray-400 mr-2 text-lg"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="border-blueGray-200 mt-10  py-10 text-center">
                <div className="flex flex-wrap ">
                  <div className="w-full px-4 ">
                    {/* kokoniireru */}
                    {isSuccess ? (
                      <div className="border-2 space-y-3 text-center">
                        {user?.articles.map((article) => {
                          return (
                            <div key={article.id} className=" bg-red-200">
                              <div className=" flex justify-center">
                                <UserArticle article={article} />
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
    </div>
  );
};

export default Article;
