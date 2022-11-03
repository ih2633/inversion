import { type NextPage } from "next";
import superjson from "superjson";

import { useRouter } from "next/router";
import { Editor } from "@tiptap/react";
import { trpc } from "@/utils/trpc";

const Article = () => {
  const router = useRouter();
  const { articleid } = router.query;
  console.log(articleid);

  const { data: article } = trpc.article.getArticleById.useQuery({
    id: articleid as string,
  });
  console.log(article);

  const editor = new Editor(
    JSON.parse(article.content)
  )
  console.log(editor)

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
