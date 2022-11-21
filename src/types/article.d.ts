import type { FavoriteWithUser } from "./favorite"

export type ArticleWithRelation = {
  id: string;
  title: string;
  content: string;
  splitContent: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  categoryId: string;
  publish: boolean;
  user: { id: string; name: string | null; image: string | null; favorites: Favorite[]; };
  tags: { name: string; }[];
  category: { name: string; };
  favorite: FavoriteWithUser;
};

export type AuthArticleInfo = {
  userId: string;
  articleId: string;
};

export type EditArticleInfo = {
  categoryId: string;
  publish: boolean;
  tag0: string;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  title: string;
};

export type SerchWord = {
  search: string;
}