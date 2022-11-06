import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


export const userRouter = router({
  getMyArticles: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { id } = input;
        const article = await ctx.prisma.user.findUnique({
          where: {
            id: id,
          },
          include: {
            articles: true,
          }
        });
        return article;
      } catch (error) {
        console.log(error);
      }
    }),
});
