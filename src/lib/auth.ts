import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import "dotenv/config";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
export const authOptions: NextAuthOptions = {
	// @ts-ignore
	adapter: DrizzleAdapter(db),
	secret: process.env.NEXTAUTH_SECRET!,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	pages: {
		signIn: "/sign-in",
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async session({ session, token }) {
			// do something to session
			if (token) {
				session.user.id = token.id;
				session.user.username = token.username;
				session.user.email = token.email;
				session.user.name = token.name;
				session.user.image = token.image as string;
			}
			return session;
		},
		async jwt({ token, user }) {
			const email = token.email;

			const dbUser = (
				await db
					.select()
					.from(users)
					.where(eq(users.email, email as string))
			)[0];

			if (!dbUser) {
				token.id = user.id;
				return token;
			}
			if (!dbUser.username) {
				await db
					.update(users)
					.set({ username: nanoid(10) })
					.where(eq(users.id, dbUser.id));
			}

			return {
				id: dbUser.id,
				email: dbUser.email,
				username: dbUser.username,
				name: dbUser.name,
				image: dbUser.image,
			};
		},
	},
};

export const getAuthSession = () => getServerSession(authOptions);
