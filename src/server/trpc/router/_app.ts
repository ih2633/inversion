import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { articleRouter } from "./article"
import { categoryRouter } from "./category";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  article: articleRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
