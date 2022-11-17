import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


export const userRouter = router({
  getUserPublishArticles: publicProcedure
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
              where: {
                publish: true,
              },
              select: {
                title: true,
                id: true,
                publish: true,
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
                updatedAt: true,
                createdAt: true,
                favorite: true,
              },
            },
            profile: true,
          },
        });
        return article;
      } catch (error) {
        console.log(error);
      }
    }),
  
  /**
   * 
   */
  getUserAllArticles: protectedProcedure
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
              where: {
                publish: false,
              },
              select: {
                title: true,
                id: true,
                publish: true,
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
                updatedAt: true,
                createdAt: true,
                favorite: true,
              },
            },
            profile: true,
          },
        });
        return article;
      } catch (error) {
        console.log(error);
      }
    }),
});
