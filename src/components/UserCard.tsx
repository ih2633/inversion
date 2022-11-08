import Image from "next/image";
import Link from "next/link";

export default function UserCard(props) {
  return (
    <>
      <div className="rounded-xl bg-white p-5">
        <div className="flex items-center">
          <div className="avatar ">
            <div className=" w-16 rounded-full shadow-md">
              <Image
                className="rounded-full"
                fill={true}
                alt="avatar"
                src={`${props.user.image}`}
              />
            </div>
          </div>
          <div className="ml-5">
            <Link href={`/user/${props.article.user.id}`} className="text-2xl font-bold">{props.user.name}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
