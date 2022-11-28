import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/article/FavoriteButton";
import type { ArticleWithRelation } from "@/types/article"

type Props = {
  article: ArticleWithRelation
}

const Card = (props: Props) => {
  const createdAt = props.article.createdAt.toLocaleDateString();
  const isSkill = props.article.category.name === "Skill";

  return (
    <>
      <section
        className={` items-start rounded-xl bg-gradient-to-r w-full
      ${isSkill
            ? " from-rose-400 via-fuchsia-500  to-indigo-500"
            : " from-amber-400 via-emerald-400  to-teal-500"
          } pb-2 shadow-lg`}
      >
        <span className="flex rounded-xl bg-white px-4 py-2 font-semibold text-black">
          <div className="my-auto">
            <div className="avatar ">
              <div className=" w-16 rounded-full shadow-xl">
                <Image
                  className="rounded-full"
                  fill={true}
                  alt="avatar"
                  src={`${props.article.user.image}`}
                />
              </div>
            </div>
          </div>

          <div className="ml-7 flex  flex-col w-64 md:w-4/5">
            <div
              className={`${isSkill ? "badge-primary" : "badge-secondary"
                } badge badge-outline mt-1 mb-2`}
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
                  // ページネーションの修正予定あり
                  <div key={x.name}>
                    <Link href={`/tag/${x.name}?skip=0&take=20`}>
                      <li className="truncate " >#{x.name}</li>
                    </Link></div>
                );
              })}
            </ul>
            <div className=" flex justify-between w-full ">
              <div className="flex items-end">
                <Link
                  href={`/user/${props.article.user.id}`}
                  className="text-gray-600"
                >
                  by {props.article.user.name}
                </Link>
              </div>
              <div className="flex items-center">
                <FavoriteButton favorite={props.article.favorite} />
                <p className="prose-md prose md:mr-12  tracking-wider text-gray-500">
                  {createdAt}
                </p>
              </div>
            </div>
          </div>
        </span>
      </section>
    </>
  );
};

export default Card;
