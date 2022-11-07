import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = router({
  getList: publicProcedure.query(async ({ ctx }) => {
    try {
      const categorys = await ctx.prisma.category.findMany();
      return categorys;
    } catch (error) {
      console.log(error);
    }
  }),
});
