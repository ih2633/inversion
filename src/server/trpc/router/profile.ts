import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const profileRouter = router({
  /**
   *
   */
  setProfile: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        profile: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("categoryのtrpcきたよ");
        const userId = await ctx.prisma.user.findUnique({
          where: {
            id: input.userId,
          },
          select: { id: true },
        });
        if (!userId) {
          throw new Error();
        }
        await ctx.prisma.profile.upsert({
          where: {
            userId: userId.id,
          },
          update: {
            profileUserName: input.name,
            profileText: input.profile,
          },
          create: {
            profileUserName: input.name,
            profileText: input.profile,
            userId: userId.id,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
});
