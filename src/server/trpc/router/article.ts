import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import cuid from "cuid";

export const articleRouter = router({
  /**
   * ArticleList publish:true
   *
   * @return article[]
   *
   */
  getAllArticles: publicProcedure.query(async ({ ctx }) => {
    try {
      const articles = await ctx.prisma.article.findMany({
        take: 15,
        // 開発中のみコメントアウト
        where: {
          publish: true,
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
              favorites: true,
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
          favorite: {
            include: {
              users: {
                select: { id: true },
              },
              _count: {
                select: {
                  users: true,
                },
              },
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
        skip: z.string(),
        take: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { tagName, skip, take } = input;
        const articles = await ctx.prisma.article.findMany({
          skip: Number(skip),
          take: Number(take),
          where: {
            publish: {
              equals: true,
            },
            tags: {
              some: {
                name: tagName,
              },
            },
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
                favorites: true,
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
            favorite: {
              include: {
                users: {
                  select: { id: true },
                },
                _count: {
                  select: {
                    users: true,
                  },
                },
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
  getArticleById: publicProcedure
    .input(
      z.object({
        articleId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { articleId } = input;
        const article = await ctx.prisma.article.findUnique({
          where: { id: articleId },
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
                id: true,
              },
            },
            favorite: {
              include: {
                users: {
                  select: { id: true },
                },
                _count: {
                  select: {
                    users: true,
                  },
                },
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
  getReEditArticle: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        articleId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { articleId } = input;
        const article = await ctx.prisma.article.findUnique({
          where: { id: articleId },
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
                id: true,
              },
            },
            favorite: {
              include: {
                users: {
                  select: { id: true },
                },
                _count: {
                  select: {
                    users: true,
                  },
                },
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
        splitContent: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = await ctx.prisma.user.findUnique({
          where: {
            email: ctx?.session?.user?.email as string | undefined,
          },
          select: { id: true },
        });

        const categoryId = await ctx.prisma.category.findUnique({
          where: {
            id: input.categoryId,
          },
          select: { id: true },
        });

        if (userId && categoryId) {
          await ctx.prisma.article.create({
            data: {
              title: input.title,
              content: input.content,
              userId: userId.id,
              categoryId: categoryId.id,
              publish: input.publish,
              splitContent: input.splitContent,
              tags: {
                connectOrCreate: input.sendTags.map((x) => {
                  return {
                    where: { name: x },
                    create: { name: x },
                  };
                }),
              },
              favorite: {
                create: { id: cuid() },
              },
            },
          });
        }
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  /**
   *
   */
  searchWordForContent: publicProcedure
    .input(
      z.object({
        searchWords: z.string(),
        skip: z.string(),
        take: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { searchWords, skip, take } = input;
        const article = await ctx.prisma.article.findMany({
          skip: Number(skip),
          take: Number(take),
          where: {
            publish: {
              equals: true,
            },
            splitContent: {
              contains: searchWords,
            },
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
                favorites: true,
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
            favorite: {
              include: {
                users: {
                  select: { id: true },
                },
                _count: {
                  select: {
                    users: true,
                  },
                },
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
  delete: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        articleId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const isAuth = input.userId === ctx.session.user.id;
        if (!isAuth) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        await ctx.prisma.article.delete({
          where: {
            id: input.articleId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  /**
   *
   */
  updateArticle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
        sendTags: z.array(z.string()),
        publish: z.boolean(),
        splitContent: z.string(),
        articleId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const isAuth = input.userId === ctx.session.user.id;
        if (!isAuth) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        await ctx.prisma.article.update({
          where: {
            id: input.articleId,
          },
          data: {
            title: input.title,
            content: input.content,
            categoryId: input.categoryId,
            publish: input.publish,
            splitContent: input.splitContent,
            tags: {
              connectOrCreate: input.sendTags.map((x) => {
                return {
                  where: { name: x },
                  create: { name: x },
                };
              }),
            },
            favorite: {
              create: { id: cuid() },
            },
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
});
