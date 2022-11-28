import Link from "next/link";
import FavoriteButton from "@/components/article/FavoriteButton"
import { MenuArticleButton } from "../MenuArticleButton";
import { useSession } from "next-auth/react";
import type { UserWithArticleRelation } from "@/types/user"

type Props = {
  article: UserWithArticleRelation
  isAuth: boolean | undefined
}

const UserArticle = (props: Props) =>  {
  const { data: session } = useSession();
  const updatedAt = props.article.updatedAt.toLocaleDateString();
  const isSkill = props.article.category.name === "Skill";

  return (
    <>
      <div className="flex md:w-4/5 rounded-xl border-2 border-gray-50 bg-white py-3 px-4 shadow-lg">
        <div className="flex flex-col text-left md:w-full">
          <div className="flex justify-between ">
            <div className="flex flex-col w-64 md:w-4/5">
              <div
                className={`${
                  isSkill ? "badge-primary" : "badge-secondary"
                } badge-outline badge mt-1 mb-2`}
              >
                {props.article.category.name}
              </div>
              <Link
                href={`/article/${props.article.id}`}
                className="mb-2 text-xl md:text-xl font-bold break-words whitespace-normal truncate max-h-20"
              >
                {props.article.title}
              </Link>
              <ul className="mb-1 space-x-2 text-gray-400 grid grid-cols-3">
                {props.article.tags.map((x) => {
                  return (
                    <Link key={x.name} href={`/tag/${x.name}`}>
                      <li className="truncate ">#{x.name}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>

            {session && (
              <div className="my-auto ">
                <MenuArticleButton
                  userId={props.article.userId}
                  articleId={props.article.id}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <div></div>
            <div className=" flex justify-end ">
              <FavoriteButton favorite={props.article.favorite} />
              <p className="prose-md prose mr-12 tracking-wider text-gray-500">
                最終更新日: {updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserArticle;
