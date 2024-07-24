import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./services/auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "Enter email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials: { email: string; password: string }) => {
        try {
          const result = await login(credentials);
          return result;
        } catch (error) {
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id!;
        token.email = user.email!;
      }
      return token;
    },

    session({ token, session }) {
      session.accessToken = token.email;
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
});
