import { type NextPage } from "next";
import { useState, useEffect, useMemo } from "react";

// Option 1: Browser + server-side
import { generateHTML } from "@tiptap/html";
import ReactHtmlParser from "react-html-parser";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const Article: NextPage = () => {

  const router = useRouter();

  const { articleid } = router.query;
  console.log(articleid);

  const { data: article, isSuccess } = trpc.article.getArticleById.useQuery({
    id: articleid as string
  },
  );
  return (
    <>
      <div className="m-12">
        <p>article path</p>
        <p className="text-xl">{articleid}</p>

        <div className="mt-4">
          {isSuccess && article ? (
            <>
              <p>{article?.id}</p>
              <p>{article?.title}</p>
              <div className="prose-sm prose mt-5  sm:prose ">
                {ReactHtmlParser(article.content)}
              </div>
            </>
          ) : (
            <div>Not Data</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Article;
