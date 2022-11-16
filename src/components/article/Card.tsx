import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/utils/trpc";
import FavoriteButton from "@/components/article/FavoriteButton";

const Card = (props) => {
  const createdAt = props.article.createdAt.toLocaleDateString();
  const isSkill = props.article.category.name === "Skill";

  return (
    <>
      <section
        className={` items-start rounded-xl bg-gradient-to-r
      ${
        isSkill
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

          <div className="ml-7 flex w-full flex-col justify-between">
            <div
              className={`${
                isSkill ? "badge-primary" : "badge-secondary"
              } badge-outline badge mt-1 mb-2`}
            >
              {props.article.category.name}
            </div>
            <Link
              href={`/article/${props.article.id}`}
              className="mb-2 text-xl font-semibold"
            >
              {props.article.title}
            </Link>
            <ul className="flex space-x-2 text-gray-400">
              {props.article.tags.map((x) => {
                return (
                  // ページネーションの修正予定あり
                  <Link key={x.name} href={`/tag/${x.name}?skip=0&take=20`}>
                    <li>#{x.name}</li>
                  </Link>
                );
              })}
            </ul>
            <div className=" flex justify-between ">
              <div>
                <Link
                  href={`/user/${props.article.user.id}`}
                  className="text-gray-600"
                >
                  by {props.article.user.name}
                </Link>
              </div>
              <div className="flex items-center">
                <FavoriteButton favorite={props.article.favorite} />
                <p className="prose-md prose mr-12  tracking-wider text-gray-500">
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
