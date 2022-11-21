import type { User } from "@prisma/client";

export type User = {
  user: User;
};

export type UserWithArticleRelation = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  publish: boolean;
  tags: { name: string }[];
  category: { name: string };
  favorite: FavoriteWithUser;
};

export type ProfileInfo = {
  name: string
  profile: string
}