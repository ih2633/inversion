import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id as string;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  secret: "g4p3SpBD1mdMpp4OJC7S5JGDuFX7m0Fwi89ei+fx7us=",
};

export default NextAuth(authOptions);
