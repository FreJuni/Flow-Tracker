import z from "zod";


export const createCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    icon: z.string().min(1, "Icon is required"),
    color: z.string().min(1, "Color is required"),
    categoryId: z.number().optional(),
    authorId: z.number().optional(),
});