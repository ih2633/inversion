import { useSession, signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex h-20 items-center justify-between border-b-2">
        <Link href="/">
          <AiOutlineHome className="ml-1 w-16 h-16 text-slate-500 hover:text-slate-800 md:ml-24 lg:ml-24 hover:bg-gray-200 p-2 rounded-xl" />
        </Link>
        <div className="flex mr-5 space-x-3 md:space-x-7 md:mr-20 items-center">
          <Link href="/search">
            <AiOutlineSearch className="w-16 h-16 text-slate-500 hover:text-slate-800 md:ml-24 hover:bg-gray-200 p-2 rounded-xl" />
          </Link>
          {session && <Link href="/edit" className="btn-accent btn">
            Edit
          </Link>}
          {session ? (
            <div className="avatar ">
              <div className="h-12 w-12 rounded-full shadow-lg ring ring-offset-2 ring-offset-base-100">
                <Link href={`/user/${session.user.id}`}>
                  <Image
                    className="rounded-full"
                    fill={true}
                    alt="avatar"
                    src={`${session?.user?.image}`}
                  />
                </Link>
              </div>
            </div>
          ) : (
            <button className="btn btn-info text-gray-100 md:mr-20 my-auto" onClick={() => signIn()}>SingIn</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;