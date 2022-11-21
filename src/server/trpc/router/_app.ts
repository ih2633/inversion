import { router } from "../trpc";
import { authRouter } from "./auth";
import { articleRouter } from "./article";
import { categoryRouter } from "./category";
import { userRouter } from "./user";
import { favoriteRouter } from "./favorite";
import { profileRouter } from "./profile";

export const appRouter = router({
  auth: authRouter,
  article: articleRouter,
  category: categoryRouter,
  user: userRouter,
  favorite: favoriteRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
