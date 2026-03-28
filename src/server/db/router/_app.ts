import { createTRPCRouter } from '../../trpc';
import * as transaction from "./transaction";

export const appRouter = createTRPCRouter({
    transaction
});

// export type definition of API
export type AppRouter = typeof appRouter;