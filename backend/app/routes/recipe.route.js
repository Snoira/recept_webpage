import Express from 'express';
import { createRecipe, getRecipes} from '../controllers/recipe.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const recipeRouter = Express.Router();

recipeRouter.post("/create", authMiddleware, createRecipe)
recipeRouter.get("/", getRecipes)

export default recipeRouter;