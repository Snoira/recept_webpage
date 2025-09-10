import Express from 'express';
import { createRecipe, getRecipes, getRecipeById} from '../controllers/recipe.controller.js';
import { likeRecipe, unlikeRecipe, getRecipeLikes } from '../controllers/like.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const recipeRouter = Express.Router();

recipeRouter.post("/create", authMiddleware, createRecipe)
recipeRouter.get("/", getRecipes)
recipeRouter.get("/:id", getRecipeById)
recipeRouter.get("/:id/likes", getRecipeLikes)
recipeRouter.put("/:id/like", authMiddleware, likeRecipe)
recipeRouter.put("/:id/unlike", authMiddleware, unlikeRecipe)

export default recipeRouter;