import type { NextPage } from "next";
import { Tiptap } from "@/components/Tiptap";

const Editor: NextPage = () => {

  return (
    <>
      <div className="md:w-4/5 md:mx-auto">
          <Tiptap />
      </div>
    </>
  );
};
export default Editor;
