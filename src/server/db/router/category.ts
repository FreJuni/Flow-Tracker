import { createCategorySchema } from "@/src/schemas/category-schema";
import { protectedProcedure } from "../../trpc";
import { db } from "..";
import z from "zod";

export const categoryRouter = {
    getCategories: protectedProcedure
        .query(async ({ ctx: { session } }) => {
            if (!session?.user.id) {
                throw new Error("Unauthorized");
            }

            const categories = await db.category.findMany({
                where: {
                    authorId: session.user.id,
                },
            });

            return categories;
        }),

    createCategory: protectedProcedure
        .input(createCategorySchema)
        .mutation(async ({ ctx: { session }, input }) => {
            const { name, icon, color } = input;

            if (!session?.user.id) {
                throw new Error("Unauthorized");
            }

            if (!name || !icon || !color) {
                throw new Error("Invalid input");
            }

            const category = await db.category.create({
                data: {
                    name,
                    icon,
                    color,
                    authorId: session.user.id,
                },
            });

            return category;
        }),

    updateCategory: protectedProcedure
        .input(createCategorySchema)
        .mutation(async ({ ctx: { session }, input }) => {
            const { name, icon, color } = input;

            if (!session?.user.id) {
                throw new Error("Unauthorized");
            }

            if (!name || !icon || !color) {
                throw new Error("Invalid input");
            }

            const category = await db.category.findUnique({
                where: {
                    id: input.categoryId,
                },
            })

            if (!category || category.authorId !== session.user.id) {
                throw new Error("Unauthorized");
            }

            const updatedCategory = await db.category.update({
                where: {
                    id: input.categoryId,
                },
                data: {
                    name,
                    icon,
                    color,
                },
            });

            return updatedCategory;
        }),

    deleteCategory: protectedProcedure
        .input(z.object({
            categoryId: z.number(),
        }))
        .mutation(async ({ ctx: { session }, input }) => {
            const { categoryId } = input;

            if (!session?.user.id) {
                throw new Error("Unauthorized");
            }

            const category = await db.category.findUnique({
                where: {
                    id: categoryId,
                },
            })

            if (!category || category.authorId !== session.user.id) {
                throw new Error("Unauthorized");
            }

            const deletedCategory = await db.category.delete({
                where: {
                    id: categoryId,
                },
            });

            return deletedCategory;
        }),
}