import { trpc } from "@/utils/trpc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { FavoriteWithUser } from "@/types/favotite"

type Props = {
  favorite: FavoriteWithUser,
}

const FavoriteButton = (props: Props) => {
  const { data: Session } = useSession();
  const [isFavorited, setIsFavorited] = useState(false);

  const userId = Session?.user.id as string;
  const favoriteId = props.favorite.id as string;

  useEffect(() => {
    const favoriteList = props.favorite.users.map((x) => {
      return x.id;
    });
    if(Session) {
    const isIncludeFavorited = favoriteList.includes(Session.user.id);
      setIsFavorited(isIncludeFavorited);
    }
  }, [Session, props.favorite.users]);

  const incMutation = trpc.favorite.incFavorite.useMutation();

  const incSubmit = (userId: string, favoriteId: string) => {
    incMutation.mutate({ userId, favoriteId });
    setIsFavorited(true);
  };

  const decMutation = trpc.favorite.decFavorite.useMutation();

  const decSubmit = (userId: string, favoriteId: string) => {
    decMutation.mutate({ userId, favoriteId });
    setIsFavorited(false);
  };

  return (
    <>
      <div className="mr-7 flex">

        {userId && favoriteId ? isFavorited ? (
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
        ) : (<div></div>)}
        <p className="ml-6 text-red-300">{props.favorite._count.users}</p>
      </div>
    </>
  );
};

export default FavoriteButton;
