import type { NextPage } from "next";
import { useEffect } from "react"
import { useRouter } from "next/router";
import { ReEdit } from "@/components/ReEdit";
import { trpc } from "@/utils/trpc";


const Editor: NextPage = () => {
  const router = useRouter();
  const query = router.query
  const userId = router.query.userId as string
  const articleId = router.query.articleId as string

  console.log(query)
  const { data: article, isSuccess } = trpc.article.getArticleById.useQuery({ userId, articleId },{enabled: router.isReady});
  console.log({ article })

  useEffect(() => {
    if (router.isReady) {
      
    }
  })

  return (
    <>
      <div className="grid grid-cols-7">
        <div className="col-span-1"></div>
        <div className="col-span-4">
          {isSuccess && article &&
            <ReEdit
              userId={userId} articleId={articleId} publish={article.publish} title={article.title} category={article.category} content={article.content} tags={article.tags} />
          }
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};
export default Editor;
