import { z } from "zod";


export const createTransactionSchema = z.object({
    amount: z.number(),
    categoryId: z.number(),
    transactionId: z.number().optional(),
    type: z.enum(["INCOME", "EXPENSE"]),
    description: z.string().optional(),
    transactionDate: z.string(),
});

export const getTransactionsSchema = z.object({
    page: z.number().optional().default(1),
    pageSize: z.number().optional().default(10),
});
