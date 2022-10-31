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
        console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      }
    }),

  addArticle: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.article.create({
          data: {
            title: input.title,
            content: input.content,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
