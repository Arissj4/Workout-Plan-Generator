import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl; // always redirect back to your app
    },
  },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};