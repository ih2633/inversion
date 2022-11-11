import react from "react";

import { trpc } from "@/utils/trpc";
import { MdOutlineFavoriteBorder } from "react-icons/md";


const FavoriteButton = (props) => {

  return (
    <>
        <div>
          <button className="mr-7 text-2xl font-bold text-red-300">
            <MdOutlineFavoriteBorder />
          </button>
        </div>
    </>
  );
}

export default FavoriteButton;
