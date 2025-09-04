import Express from 'express';
import { createRecipe, getRecipes, getRecipeById} from '../controllers/recipe.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const recipeRouter = Express.Router();

recipeRouter.post("/create", authMiddleware, createRecipe)
recipeRouter.get("/", getRecipes)
recipeRouter.get("/:id", getRecipeById)

export default recipeRouter;