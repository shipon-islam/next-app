import connectMongo from "@/middleware/mongoose";
import userModel from "@/models/userModel";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await connectMongo();
        const user = await userModel.findOne({ email });
        if (!user) {
          throw new Error("invalid credentials");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("invalid credentials");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
