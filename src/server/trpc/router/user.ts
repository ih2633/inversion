import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


export const userRouter = router({
  getMyArticles: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { userId } = input;
        const article = await ctx.prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            articles: {
              include: {
                tags: {
                  select: {
                    name: true,
                  },
                },
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            profile: true
          },
        });
        return article;
      } catch (error) {
        console.log(error);
      }
    }),
});
