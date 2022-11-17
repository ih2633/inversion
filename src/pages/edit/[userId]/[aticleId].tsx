import type { NextPage } from "next";
import { ReEdit } from "@/components/ReEdit";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";

const Editor: NextPage = () => {
  const router = useRouter();
  const {userId, articleId} = router.query
  const { data: session } = useSession()
  const { data: article, isSuccess } = trpc.article.getArticleById.useQuery({
    articleId,
  });

  console.log({ session })
  return (
    <>
      <div className="grid grid-cols-7">
        <div className="col-span-1"></div>
        <div className="col-span-4">
          <ReEdit />
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};
export default Editor;
