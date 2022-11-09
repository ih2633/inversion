import type { NextPage } from "next";
import { Tiptap } from "@/components/Tiptap";
import { useSession } from "next-auth/react";

const Editor: NextPage = () => {
  const {data: session} = useSession()

  console.log(session)

  return (
    <>
      <div className="grid grid-cols-7">
        <div className="col-span-1"></div>
        <div className="col-span-4">
          <Tiptap />
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};
export default Editor;
