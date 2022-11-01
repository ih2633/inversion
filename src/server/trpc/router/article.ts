import { resolve } from "path";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";


export const articleRouter = router({
  getAllArticles: publicProcedure.query(async ({ ctx }) => {
    try {
      const articles = await ctx.prisma.article.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return articles;
    } catch (error) {
      console.log(error);
    }
  }),

  getArticleById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { id } = input;
        const article = await ctx.prisma.article.findUnique({
          where: { id },
        });
        return article;
      } catch (error) {
        console.log(error);
      }
    }),

  /**
   *
   */
  addArticle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        category: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("categoryのtrpcきたよ");
        const userId = await ctx.prisma.user.findUnique({
          where: {
            email: ctx?.session?.user?.email as string | undefined,
          },
          select: { id: true },
        });
        await ctx.prisma.article.create({
          data: {
            title: input.title,
            content: input.content,
            userId: userId?.id,
            categoryId: input.category,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  /**
   *
   */
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.article.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
