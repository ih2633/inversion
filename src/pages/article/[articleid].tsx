import { type NextPage } from "next";
import superjson from "superjson";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const Article: NextPage = () => {
  const router = useRouter();
  const { articleid } = router.query;
  console.log(articleid);

  const {data: article} = trpc.article.getArticleById.useQuery({
    id: Number(articleid),
  });
  console.log(article)

  return (
    <>
      <div className="m-12">
        <p>article path</p>
        <p className="text-xl">{articleid}</p>

        <div className="mt-4">
          {article ? (
            <>
              <p>{article.id}</p>
              <p>{article.title}</p>
              <p>{article.content}</p>
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
