import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/utils/trpc";

const UserArticle = (props) => {
  console.log({ props });
    const date = props.article.updatedAt.toLocaleDateString();
  console.log(date);
  const isSkill = props.article.category.name === "Skill";

  return (
    <>
      <div className="flex w-4/5 rounded-xl border-2 border-gray-50 bg-white py-3 px-4 shadow-lg">
        <div className="ml-7 flex w-full flex-col justify-between text-left">
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
          <div className=" flex justify-between ">
            <div></div>
            <p className="prose-md prose mr-12 tracking-wider text-gray-500">
              最終更新日: {date}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserArticle;
