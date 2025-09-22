import z from "zod";
import { Types } from "mongoose";

export const ENUM_UNIT = ['l', 'dl', 'cl', 'ml', 'msk', 'tsk', 'krm', 'g', 'hg', 'kg'];
export const ENUM_CATEGORY = ['Bakverk', 'Frukost', 'Lunch', 'Middag', 'Efterrätt', 'Dryck', 'Snacks', 'Sallad', 'Sås', 'Vegetariskt', 'Veganskt'];

const ingredientItem = z.object({
    amount: z.number().min(0.5).nullable(),
    unit: z.enum(ENUM_UNIT).nullable(),
    name: z.string().min(2).max(50),
})

const ingredientGroup = z.object({
    title: z.string().max(100).nullable(),
    items: z.array(ingredientItem).min(1).max(50),
})

const imageObject = z.object({
    URL: z.string().optional().nullable(),
    alt: z.string().max(500).nullable()
})

export const recipeSchema = z.object({
    author: z.instanceof(Types.ObjectId, "Invalid author ID"),
    title: z.string().min(2).max(100),
    portions: z.number().min(1).max(100).default(4),
    description: z.string().min(5).max(1000),
    time: z.number().min(5).max(1440).nullable(),
    categories: z.array(z.enum(ENUM_CATEGORY)).max(3).nullable(),
    ingredients: z.array(ingredientGroup).min(1).max(30),
    instructions: z.array(z.string().min(5).max(500)).min(1).max(50),
    image: imageObject.nullable(),
})