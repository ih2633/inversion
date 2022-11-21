import { trpc } from "../utils/trpc";

export const articleOptimisticUpdates = (router: any, ctx: any) => {
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

  return mutation;
};

export const userArticleOptimisticUpdates = (router: any, ctx: any) => {
  const mutation = router.useMutation({
    onMutate: () => {
      ctx.user.getUserPublishArticles.cancel();
      ctx.user.getUserAllArticles.cancel();

      const optimisticUpdate = ctx.user.getUserPublishArticles.getData();

      const optimisticUpdate2 = ctx.user.getUserAllArticles.getData();

      if (optimisticUpdate) {
        ctx.user.getUserPublishArticles.setData(optimisticUpdate);
      }

      if (optimisticUpdate2) {
        ctx.user.getUserAllArticles.setData(optimisticUpdate2);
      }
    },
    onSettled: () => {
      ctx.user.getUserPublishArticles.invalidate();
      ctx.user.getUserAllArticles.invalidate();
    },
  });

  return mutation;
};
