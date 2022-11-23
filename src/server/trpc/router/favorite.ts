import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const favoriteRouter = router({
  incFavorite: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        favoriteId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId, favoriteId } = input;
        await ctx.prisma.favorite.update({
          where: {
            id: favoriteId,
          },
          data: {
            users: { set: { id: userId } },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  decFavorite: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        favoriteId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId, favoriteId } = input;
        await ctx.prisma.favorite.update({
          where: {
            id: favoriteId,
          },
          data: {
            users: { disconnect: { id: userId } },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
