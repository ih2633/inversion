import { type NextPage } from "next";
import Link from "next/link";
import FavoriteButton from "@/components/article/FavoriteButton"
import { MenuArticleButton } from "../MenuArticleButton";
import { useSession } from "next-auth/react";


const UserArticle = (props:any) =>  {
  const { data: session } = useSession();
  const updatedAt = props.article.updatedAt.toLocaleDateString();
  const isSkill = props.article.category.name === "Skill";


  return (
    <>
      <div className="flex w-4/5 rounded-xl border-2 border-gray-50 bg-white py-3 px-4 shadow-lg">
        <div className="ml-7 flex w-full flex-col text-left">
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <div
                className={`${
                  isSkill ? "badge-primary" : "badge-secondary"
                } badge-outline badge mt-1 mb-2`}
              >
                {props.article.category.name}
              </div>
              <Link
                href={`/article/${props.article.id}`}
                className="text-xl font-semibold"
              >
                {props.article.title}
              </Link>
              <ul className="flex space-x-2 text-gray-400">
                {props.article.tags.map((x) => {
                  return (
                    <Link key={x.index} href={`/tag/${x.name}`}>
                      <li>#{x.name}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>

            {session && (
              <div className="my-auto mr-10">
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
