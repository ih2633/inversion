import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const articleRouter = router({
  /**
   *
   */
  getAllArticles: publicProcedure.query(async ({ ctx }) => {
    try {
      const articles = await ctx.prisma.article.findMany({
        // 開発中のみコメントアウト
        where: {
          publish: true
        },

        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
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
      });
      return articles;
    } catch (error) {
      console.log(error);
    }
  }),

  /**
   *
   */
  selectArticleTag: publicProcedure
    .input(
      z.object({
        tagName: z.string(),
      })
  )
    .query(async ({ ctx, input }) => {
      try {
        const { tagName } = input;
        const articles = await ctx.prisma.article.findMany({
          where: {
            publish: {
              equals: true
            },
            tags: {
              some: {
                name: tagName
              }
            }
          },
            orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
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
        }) 
        return articles
      } catch(error) {
        console.log(error)
    }
  }),
  /**
   *
   */
  getArticleById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { id } = input;
        const article = await ctx.prisma.article.findUnique({
          where: { id },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
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
        categoryId: z.string(),
        sendTags: z.array(z.string()),
        publish: z.boolean(),
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
            categoryId: input.categoryId,
            publish: input.publish,
            tags: {
              connectOrCreate: input.sendTags.map((x) => {
                return {
                  where: { name: x },
                  create: { name: x },
                };
              }),
            },
          },
        });
      } catch (error) {
        console.log("-------------------------------------");
        console.log("だめです");
        console.log(error);

        console.log("-------------------------------------");
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  /**
   *
   */
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
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
