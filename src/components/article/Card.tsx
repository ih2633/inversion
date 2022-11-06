import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/utils/trpc";

const Card = (props) => {
  console.log({ props });

  const date = props.article.createdAt.toLocaleDateString();
  console.log(date);

  return (
    <>
      <div className="flex items-start rounded-xl border-2 border-gray-50 bg-white py-3 px-4 shadow-lg">
        <div className="my-auto">
          <div className="avatar ">
            <div className=" w-16 rounded-full shadow-lg ring ring-offset-2 ring-offset-base-100 ">
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
          <Link
            href={`/article/${props.article.id}`}
            className="text-xl font-semibold"
          >
            {props.article.title}
          </Link>
          <div className="mt-2 badge-primary badge-outline badge">primary</div>
          <div className=" flex justify-between ">
            <div>
              <p className="text-gray-600">by {props.article.user.name}</p>
            </div>
            <p className="prose-md prose mr-12  tracking-wider text-gray-500">
              {date}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
