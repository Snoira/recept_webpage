import Recipe from "../models/recipe.model.js";
import User from "../models/user.model.js";
import { recipeSchema } from "../utils/validation.js";
import { ZodError, prettifyError } from "zod";

export async function createRecipe(req, res) {

    const author = req.userId
    // const { title, portions, time, categories, description, ingredientList, instructions, image } = req.body;

    try {
        if (!author) return res.status(400).json({ message: "Missing author" })
        if (!req.body) return res.status(400).json({ message: "Missing recipe data" })

        //validerar i tre steg, frontend, backend och mongoose. överdrivet eller bra?
        const recipeInputs = recipeSchema.parse({ ...req.body, author })

        console.log("recipeInputs: ", recipeInputs)

        //redunant kod pga jwt verification?
        const user = await User.findById(author)
        if (!user) return res.status(404).json({ message: "User not found" })

        const capitalizeFirstLetter = (string) => {
            const firstLetter = string.charAt(0).toUpperCase()
            const restOfString = string.slice(1).toLowerCase()
            return firstLetter + restOfString
        }

        recipeInputs.title = capitalizeFirstLetter(recipeInputs.title)
        recipeInputs.ingredients.map(group => {
            if (group.title) group.title = capitalizeFirstLetter(group.title)
            group.items.map(item => {
                item.name = capitalizeFirstLetter(item.name)
            })
        })
        recipeInputs.instructions.map(group => {
            if (group.title) group.title = capitalizeFirstLetter(group.title)
        })

        //todo: vidare normalisering av data, t.ex amount+enhet (volym,vikt i ml,g) och liknande.

        const newRecipe = await Recipe.create(recipeInputs)
        await newRecipe.populate("author", "-password")

        if (newRecipe) res.status(201).send(newRecipe);


    } catch (error) {
        if (error instanceof ZodError) {
            const prettyError = prettifyError(error)
            console.log("Validation error in createRecipe: \n", prettyError);
            return res.status(400).json({ message: prettyError })
        }

        console.log("Error in createRecipe:", error);
        res.status(500).json({ message: error.message })
    }
}

export async function getRecipes(req, res) {
    try {
        //TODO: olika queries for filter, sort, search etc

        console.log("Getting all recipes")
        const recipes = await Recipe.find()
            .sort({ createdAt: -1 })

        console.log(`Found ${recipes.length} recipes`)
        res.status(200).json(recipes)

    } catch (error) {
        console.log("Error in getRecipes:", error);
        res.status(500).json({ message: error.message })
    }
}