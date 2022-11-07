import react from "react";
import { useSession } from "next-auth/react"
import Image from "next/image"

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  console.log({ session })
  if (session){
    console.log(session.user.image)
  }

  return (
    <>
      <div className="flex h-20 items-center justify-between border-b-2">
        <div>aaa</div>
        <div className="mr-5">
          <div className="avatar ">
            <div className=" w-12 rounded-full shadow-lg ring ring-offset-2 ring-offset-base-100 ">
              {session?.user ? (
                <Image
                  className="rounded-full"
                  fill={true}
                  alt="avatar"
                  src={`${session?.user?.image}`}
                />
              ) : (
                <div>はいってない</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;