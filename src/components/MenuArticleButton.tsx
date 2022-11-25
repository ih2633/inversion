import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import DeleteArticleButton from "./DeleteButton";
import type { AuthArticleInfo } from "@/types/article"

export const MenuArticleButton = (props: AuthArticleInfo) => {
  return (
    <div className="flex md:space-x-4">
      <Link
        href={`/edit/${props.userId}/${props.articleId}`}
        className="rounded-xl p-2 hover:bg-gray-200"
      >
        <AiOutlineEdit className="h-8 w-8" />
      </Link>
      <div className="rounded-xl p-2 hover:bg-gray-200">
        <DeleteArticleButton
          userId={props.userId}
          articleId={props.articleId}
        />
      </div>
    </div>
  );
};
