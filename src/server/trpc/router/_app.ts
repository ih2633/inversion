import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { articleRouter } from "./article";
import { categoryRouter } from "./category";
import { userRouter } from "./user"

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  article: articleRouter,
  category: categoryRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
