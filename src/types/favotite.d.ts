import  { Prisma, type Favorite } from "@prisma/client";

const favoriteWithUser = Prisma.validator<Prisma.FavoriteArgs>()({
  include: { users: true, _count: true },
});

export type FavoriteWithUser = Prisma.FavoriteGetPayload<typeof favoriteWithUser>;

export type Favorite = Favorite