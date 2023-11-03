import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async session({ session, user, token }: any) {
      if (session) {
        if (session.user) {
          session.user.id = user.id;
        }
      }
      return session;
    },
    async jwt({ token, user, account, profile }: any) {
      return token;
    },
  },
};
