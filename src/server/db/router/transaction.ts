import { protectedProcedure } from "../../trpc";
import z from "zod";

export const test = protectedProcedure
    .input(
        z.object({
            name: z.string(),
        })
    ).query(async ({ ctx: { session }, input }) => {
        console.log("HELLO WORLD", session, input.name);

        return {
            message: "HELLO WORLD",
            session,
            name: input.name
        };
    });