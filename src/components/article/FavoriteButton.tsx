import react from "react";

import { trpc } from "@/utils/trpc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const FavoriteButton = (props) => {
  const { data: Session } = useSession();
  const [isFavorited, setIsFavorited] = useState(false);

  const userId = Session?.user.id;
  const favoriteId = props.favorite.id;

  useEffect(() => {
    const favoriteList = props.favorite.users.map((x) => {
      return x.id;
    });
    const isIncludeFavorited = favoriteList.includes(Session?.user.id);
    setIsFavorited(isIncludeFavorited);
  }, []);

  const incMutation = trpc.favorite.incFavorite.useMutation();

  const incSubmit = (userId, favoriteId) => {
    incMutation.mutate({ userId, favoriteId });
    setIsFavorited(true);
  };

  const decMutation = trpc.favorite.decFavorite.useMutation();

  const decSubmit = (userId, favoriteId) => {
    decMutation.mutate({ userId, favoriteId });
    setIsFavorited(false);
  };

  return (
    <>
      <div className="mr-7 flex">
        {isFavorited ? (
            <button
              className="text-2xl text-red-300"
              onClick={() => decSubmit(userId, favoriteId)}
            >
              <MdOutlineFavorite />
            </button>
        ) : (
          <button
            className="text-2xl text-red-300"
            onClick={() => incSubmit(userId, favoriteId)}
          >
            <MdOutlineFavoriteBorder />
          </button>
        )}
        <p className="ml-6 text-red-300">{props.favorite._count.users}</p>
      </div>
    </>
  );
};

export default FavoriteButton;
