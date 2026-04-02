import { createTransactionSchema, getTransactionsSchema } from "@/src/schemas/transaction-schema";
import { protectedProcedure } from "../../trpc";
import { db } from "..";

export const transactionRouter = {
    getTransactions: protectedProcedure
        .input(getTransactionsSchema)
        .query(async ({ ctx: { session }, input }) => {
            if (!session?.user.id) {
                throw new Error("Unauthorized");
            }

            const [transactions, count] = await Promise.all([
                db.transaction.findMany({
                    skip: (input.page - 1) * input.pageSize,
                    take: input.pageSize,
                    orderBy: {
                        transactionDate: "desc",
                    },
                    where: {
                        authorId: session.user.id,
                    },
                    include: {
                        category: {
                            select: {
                                name: true,
                                icon: true,
                                color: true,
                            },
                        },
                    },
                }),
                db.transaction.count({
                    where: {
                        authorId: session.user.id,
                    },
                })
            ])

            return { transactions, count };
        }),

    createTransaction: protectedProcedure
        .input(createTransactionSchema)
        .mutation(async ({ ctx: { session }, input }) => {

            if (!input.amount || !input.categoryId || !input.type || !input.transactionDate) {
                throw new Error("Invalid input");
            }

            if (!session?.user.id) {
                throw new Error("Unauthorized");
            }

            const transaction = await db.transaction.create({
                data: {
                    amount: input.amount,
                    categoryId: input.categoryId,
                    type: input.type,
                    transactionDate: input.transactionDate,
                    description: input.description,
                    authorId: session.user.id,
                },
            });

            return transaction;
        }),

    updateTransaction: protectedProcedure
        .input(createTransactionSchema)
        .mutation(async ({ ctx: { session }, input }) => {

            if (!input.amount || !input.categoryId || !input.type || !input.transactionDate) {
                throw new Error("Invalid input");
            }

            if (!session?.user.id) {
                throw new Error("Unauthorized");
            }

            if (!input.transactionId) {
                throw new Error("Transaction not found");
            }

            const transaction = await db.transaction.findUnique({
                where: {
                    id: input.transactionId,
                },
            });

            if (!transaction || transaction.authorId !== session.user.id) {
                throw new Error("Unauthorized");
            }

            const updatedTransaction = await db.transaction.update({
                where: {
                    id: input.transactionId,
                },
                data: {
                    amount: input.amount,
                    categoryId: input.categoryId,
                    type: input.type,
                    transactionDate: input.transactionDate,
                    description: input.description,
                },
            });

            return updatedTransaction;
        })
}