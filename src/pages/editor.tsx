import type { NextPage } from "next";
import { Tiptap } from "@/components/Tiptap";

const Editor: NextPage = () => {
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1"></div>
        <div className="col-span-4">
          <Tiptap />
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default Editor;
