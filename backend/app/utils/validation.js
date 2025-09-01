import z from "zod";

const ENUM_UNIT = ['l', 'dl', 'cl', 'ml', 'msk', 'tsk', 'krm', 'g', 'hg', 'kg'];
const ENUM_CATEGORY = ['Bakverk', 'Frukost', 'Lunch', 'Middag', 'Efterrätt', 'Dryck', 'Snacks', 'Sallad', 'Sås', 'Vegetariskt', 'Veganskt'];

const ingredientItem = z.object({
    amount: z.number().min(0).optional().nullable(),
    unit: z.enum(ENUM_UNIT).optional().nullable(),
    name: z.string().min(2).max(100),
    note: z.string().max(100).optional().nullable(),
})

const ingredientGroup = z.object({
    title: z.string().max(50).optional().nullable(),
    items: z.array(ingredientItem).min(1)
})

const instructionGroup = z.object({
    title: z.string().max(50).optional().nullable(),
    steps: z.array(z.string().min(2).max(500)).min(1)
})

const imageObject = z.object({
    URL: z.string().optional().nullable(),
    alt: z.string().max(500).optional().nullable()
}).optional().nullable()

export const createRecipeSchema = z.object({
    title: z.string().min(2).max(100),
    portions: z.number().min(1).default(4),
    description: z.string().max(1000),
    time: z.number().min(5).optional().nullable(),
    categories: z.array(z.enum(ENUM_CATEGORY)).max(10).optional(),
    ingredients: z.array(ingredientGroup).min(1),
    instructions: z.array(instructionGroup).min(1),
    image: imageObject.optional(),
})

export const recipeSchema = z.object({
    author: z.string(),
    title: z.string().min(2).max(100),
    portions: z.number().min(1).default(4),
    description: z.string().max(1000),
    time: z.number().min(5).optional().nullable(),
    categories: z.array(z.enum(ENUM_CATEGORY)).max(10).optional().nullable(),
    ingredients: z.array(ingredientGroup).min(1),
    instructions: z.array(instructionGroup).min(1),
    image: imageObject.optional().nullable(),
})