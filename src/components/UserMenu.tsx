import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import { AiOutlineSetting, AiOutlineMore } from "react-icons/ai";

type Props = {
  userId: string
}

export const UserMenu = (props: Props) => {
  return (
    <div className=" ">
      <section className="absolute hidden md:flex top-3 right-0 mr-6 space-x-12">
        <Link href={`./${props.userId}/setting`}>
          <div className="rounded-xl  px-3 text-slate-500 hover:bg-gray-200  hover:text-slate-800">
            <AiOutlineSetting className="h-12 w-12" />
          </div>
        </Link>
        <button
          className="btn-warning btn normal-case "
          onClick={() => signOut()}
        >
          SignOut
        </button>
      </section>
      <section className="absolute dropdown dropdown-end md:hidden  top-3 right-5 ">
        <label tabIndex={0} className="btn btn-ghost text-4xl">
          <AiOutlineMore />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li className="btn  btn-ghost  w-full text-center mx-auto">
            <Link className="text-center mx-auto" href={`./${props.userId}/setting`}>
            Setting
          </Link>
          </li>
          <li className="btn  btn-warning "
            onClick={() => signOut()}>
            SignOut
          </li>
        </ul>
      </section>
    </div>
  )
}