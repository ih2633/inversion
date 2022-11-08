import { type NextPage } from "next";
import { useState, useEffect, useMemo } from "react";



// Option 1: Browser + server-side
import { generateHTML } from "@tiptap/html";
import ReactHtmlParser from "react-html-parser";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Toc from "@/components/Toc"
import UserCard from "@/components/UserCard"

const Article: NextPage = () => {
  const [isRendered, setRendered] = useState(false)

  const router = useRouter();

  const { articleid } = router.query;
  console.log(articleid);

  const { data: article, isSuccess } = trpc.article.getArticleById.useQuery({
    id: articleid as string
  },
  );
    const createDate = article?.createdAt.toLocaleDateString();
  console.log(createDate);
  const updateDate = article?.updatedAt.toLocaleDateString();

  console.log({article})

  const isSkill = article?.category?.name === "Skill";


  return (
    <>
      <div className="h-screen w-screen bg-violet-50 text-gray-700">
        <div className=" container mx-auto bg-red-200 ">
          <div className="mx-auto mt-12">
            {isSuccess && article && (
              <>
                <p className="p-7 text-center text-4xl font-extrabold">
                  {article.title}
                </p>
              </>
            )}
            <div className="mt-3 grid grid-cols-6">
              <div className="col-span-4 w-full">
                {isSuccess && article ? (
                  <>
                    <div className=" prose-sm prose mx-auto w-full whitespace-pre-wrap break-words rounded-2xl bg-white p-8 tracking-wider focus:outline-none sm:prose lg:prose-xl xl:prose-3xl">
                      <div className="flex justify-between items-center">
                        <div
                          className={`${
                            isSkill ? "badge-primary" : "badge-secondary"
                          } badge-outline badge h-8 w-20`}
                        >
                          {article?.category?.name}
                        </div>
                        <div className="flex space-x-3">
                          <p>投稿日: {createDate}</p>
                          <p>最終更新日: {updateDate}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 text-gray-400">
                        {article.tags.map((x) => {
                          return <p key={x.name}>#{x.name}</p>;
                        })}
                      </div>
                      <div className="blogContents">
                        {ReactHtmlParser(article.content)}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>Not Data</div>
                )}
              </div>
              <div className="col-span-2 mx-4 ">
                {isSuccess && article && (
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
