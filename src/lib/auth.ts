
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { db } from "@/src/server/db";

async function findUser(userId: string) {
    return await db.user.findUnique({
        where: {
            id: userId,
        },
    });
}

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
        usePlural: false,
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        // facebook: {
        //     clientId: process.env.FACEBOOK_CLIENT_ID as string,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        //     scopes: ["email", "public_profile"],
        // },
    },
    session: {
        cookieCache: { enabled: true }
    },
    databaseHooks: {
        user: {
            create: {
                async before(user) {
                    const $user = { ...user } as any
                    return {
                        data: {
                            ...$user,
                            role: 'USER'
                        }
                    }
                }
            }
        }
    },
    plugins: [
        customSession(async ({ session }) => {
            const userData = await findUser(session.userId);
            console.log("userData", userData);

            return {
                role: userData?.role,
                user: userData,
                session,
            }
        }),
        nextCookies(),
    ]
});