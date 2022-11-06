import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/utils/trpc";

const UserArticle = (props) => {
  console.log({ props });
  console.log("asdfsadfsadfsadfsadfqwaerdfsadf")
    const date = props.article.updatedAt.toLocaleDateString();
  console.log(date);
  
  return (
    <>
      <div className="flex w-4/5 rounded-xl border-2 border-gray-50 bg-white py-3 px-4 shadow-lg">
        <div className="ml-7 flex w-full flex-col justify-between text-left">
          
          <div className="badge-primary badge-outline badge mt-2">primary</div>
          <Link
            href={`/article/${props.article.id}`}
            className="text-xl font-semibold"
          >
            {props.article.title}
          </Link>
          <div className="badge-primary badge-outline badge mt-2">primary</div>
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
