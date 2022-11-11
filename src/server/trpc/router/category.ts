import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = router({
  getList: publicProcedure.query(async ({ ctx }) => {
    try {
      const categories = await ctx.prisma.category.findMany();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }),
});
