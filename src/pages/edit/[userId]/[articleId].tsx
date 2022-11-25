import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ReEdit } from "@/components/ReEdit";
import { trpc } from "@/utils/trpc";

const ReEditor: NextPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const articleId = router.query.articleId as string;

  const { data: article, isSuccess } = trpc.article.getReEditArticle.useQuery(
    { userId, articleId },
    { enabled: router.isReady }
  );

  return (
    <div className="md:mx-auto md:w-4/5">
      {isSuccess && article && (
        <ReEdit
          userId={userId}
          articleId={articleId}
          publish={article.publish}
          title={article.title}
          category={article.category}
          content={article.content}
          tags={article.tags}
        />
      )}
    </div>
  );
};
export default ReEditor;
