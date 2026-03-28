import { initTRPC } from '@trpc/server';
import { authClient } from '../utils/auth-client';
import { getSession } from '../utils/auth-session';

export const createTRPCContext = async () => {
    const { session } = await getSession()
    return {
        session: session ?
            {
                ...session,
                user: {
                    ...session.user,
                    role: session.role
                }
            } : null
    };
}

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC
    .context<{
        session:
        | (typeof authClient.$Infer.Session & { user: { role: string } })
        | null;
    }>()
    .create({
        /**
         * @see https://trpc.io/docs/server/data-transformers
         */
        // transformer: superjson,
    });

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
    t.middleware(async ({ next, ctx }) => {
        if (!ctx.session) {
            throw new Error("Unauthorized")
        }
        return next()
    })
)