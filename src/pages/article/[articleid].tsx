import { type NextPage } from "next";
import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Toc from "@/components/Toc";
import UserCard from "@/components/UserCard";

const Article = () => {
  const router = useRouter();
  const [createdAt, setCreatedAt] = useState<string>("")
  const [updatedAt, setUpdatedAt] = useState<string>("")
  const [isSetData, setIsSetData] = useState<boolean>(false)

  const articleId = router.query.articleId as string;
  const { data: article } = trpc.article.getArticleById.useQuery({ articleId }, { enabled: router.isReady });
  useEffect(() => {
    if (article) {
      const createdAt = article.createdAt.toLocaleDateString();
      const updatedAt = article.updatedAt.toLocaleDateString();
      setCreatedAt(createdAt)
      setUpdatedAt(updatedAt)
      setIsSetData(true)
    }
  }, [article])



  console.log({articleId})
  
  
  const isSkill = article?.category?.name === "Skill";


  return (
    <>
      <div className="h-screen w-screen bg-violet-50 text-gray-700">
        <div className=" container mx-auto">
          <div className="mx-auto">
            {isSetData && article && (
              <>
                <p className="p-7 text-center text-4xl font-extrabold">
                  {article.title}
                </p>
              </>
            )}
            <div className="mt-3 grid grid-cols-6">
              <div className="col-span-4 w-full">
                {isSetData && article  ? (
                  <>
                    <div className=" mx-auto w-full whitespace-pre-wrap break-words rounded-2xl bg-white p-8 focus:outline-none">
                      <div className="flex items-center justify-between">
                        <div
                          className={`${
                            isSkill ? "badge-primary" : "badge-secondary"
                          } badge-outline badge h-8 w-20`}
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
                          {article.tags.map((x) => {
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
                    <div className="flex justify-center mt-32">
                      <div className="animate-spin h-10 w-10 border-4 border-info rounded-full border-t-transparent"></div>
                    </div>
                )}
              </div>
              <div className="col-span-2 mx-4 ">
                {isSetData && article && (
                  <div className="sticky top-10  ">
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
