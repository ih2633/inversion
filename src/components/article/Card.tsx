import { type NextPage } from "next";
import Link from "next/link"
import Image from "next/image"
import { trpc } from "@/utils/trpc";


const Card = (props) => {

  console.log({props})

  return (
    <>
      <div className=" w-3/5 rounded-xl border-2 p-5">
        <div className="flex justify-between">
          <div className="w-3/5">
            <Link
              href={`/article/${props.article.id}`}
              className="text-2xl font-black text-gray-800 hover:underline"
            >
              {props.article.title}
            </Link>
          </div>

          <div className="flex">
            <p className="text-right text-gray-500">
              By {props.article.user.name}
            </p>
            <div className=" relative h-16 w-16 bg-green-200 ">
              <Image
                alt="avatar"
                src={`${props.article.user.image}`}
                className=""
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
