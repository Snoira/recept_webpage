import Recipe from "../models/recipe.model.js";
import { recipeSchema } from "../utils/validation.js";
import { ZodError, prettifyError } from "zod";

const capitalizeFirstLetter = (string) => {
    const firstLetter = string.charAt(0).toUpperCase()
    const restOfString = string.slice(1).toLowerCase()
    return firstLetter + restOfString
}

export async function createRecipe(req, res) {
    const author = req.userId

    try {
        if (!author) return res.status(400).json({ message: "Missing author" })
        if (!req.body) return res.status(400).json({ message: "Missing recipe data" })

        const recipeInputs = recipeSchema.parse({ ...req.body, author })

        recipeInputs.title = capitalizeFirstLetter(recipeInputs.title)
        recipeInputs.ingredients.forEach(group => {
            if (group.title) group.title = capitalizeFirstLetter(group.title)
            group.items.forEach(item => {
                item.name = capitalizeFirstLetter(item.name)
            })
        })
        recipeInputs.instructions.forEach(group => {
            if (group.title) group.title = capitalizeFirstLetter(group.title)
        })

        //todo: vidare normalisering av data, t.ex amount+enhet (volym,vikt i ml,g) och liknande.

        const newRecipe = await Recipe.create(recipeInputs)
            .populate("author", "-password -email -createdAt -updatedAt -__v");

        if (newRecipe) return res.status(201).json(newRecipe);

    } catch (error) {
        if (error instanceof ZodError) {
            const prettyError = prettifyError(error)
            console.log("Validation error in createRecipe: \n", prettyError);
            return res.status(400).json({ message: prettyError })
        }

        console.log("Error in createRecipe:", error);
        return res.status(500).json({ message: error.message })
    }
}

export async function getRecipes(req, res) {
    try {
        console.log("Fetching recipes with query:", req.query);
        console.log("Query params:", req.params);
        const filter = {}
        const { author } = req.query;

        if (author) {
            filter.author = author
        }

        //TODO: olika queries for filter, sort, search etc
        const recipes = await Recipe.find(filter)
            .populate("author", "firstName lastName")
            .sort({ createdAt: -1 })

        return res.status(200).json(recipes)

    } catch (error) {
        console.log("Error in getRecipes:", error);
        return res.status(500).json({ message: error.message })
    }
}

export async function getRecipeById(req, res) {
    const recipeId = req.params.id

    try {
        console.log("Fetching recipe with ID:", recipeId);
        if (!recipeId) return res.status(400).json({ error: "Missing recipe ID" })

        const recipe = await Recipe.findById(recipeId)
            .populate("author", "firstName lastName")
        return res.status(200).json(recipe)

    } catch (error) {
        console.log("Error in getRecipeById:", error);
        return res.status(500).json({ error: error.message })
    }
}

