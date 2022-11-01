import { trpc } from "../utils/trpc";

export const articleOptimisticUpdates = (router, ctx) => {
  const mutation = router.useMutation({
    onMutate: () => {
      ctx.article.getAllArticles.cancel();

      const optimisticUpdate = ctx.article.getAllArticles.getData();

      if (optimisticUpdate) {
        ctx.article.getAllArticles.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.article.getAllArticles.invalidate();
    },
  });

  return mutation
};
