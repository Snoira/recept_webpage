import Favorites from '../models/favorites.model.js';
import Recipe from '../models/recipe.model.js';
import { isValidObjectId } from 'mongoose';

const includesRecipeId = (favoritesObj, recipeId) => {
    return favoritesObj.recipes.some(id => id.toString() === recipeId);
}

export async function addFavorite(req, res) {

    const user = req.userId;

    const recipeId = req.params.id;
    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ message: "Invalid recipe id" });
    }
    
    try {
        const favoritedRecipe = await Recipe.findById({ _id: recipeId });
        if (!favoritedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        const favoritesObj = await Favorites.findOne({ user });

        if (!favoritesObj) {
            const newFavoritesObj = await Favorites.create({ user, recipes: [recipeId] });
            return res.status(201).json(newFavoritesObj);
        }

        if (includesRecipeId(favoritesObj, recipeId)) {
            return res.status(409).json({ message: 'Recipe is already in favorites' });
        }

        favoritesObj.recipes.push(recipeId);
        await favoritesObj.save()

        return res.status(200).json(favoritesObj.recipes);

    } catch (error) {
        console.log("Error creating favorite: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}

export async function getFavorites(req, res) {
    const user = req.userId;
    try {
        const favoritesObj = await Favorites.findOne({ user });
        if (!favoritesObj) return res.status(204).json([]);

        return res.status(200).json(favoritesObj.recipes);

    } catch (error) {
        console.log("Error fetching favorites: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}

export async function getFavoritesPopulated(req, res) {
     const user = req.userId;
    try {
        const favoritesObj = await Favorites.findOne({ user });
        if (!favoritesObj) return res.status(204).json([]);
        if (favoritesObj.recipes.length > 0) await favoritesObj.populate("recipes");

        return res.status(200).json(favoritesObj.recipes);

    } catch (error) {
        console.log("Error fetching favorites: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}

export async function removeFavorite(req, res) {
    const user = req.userId;
    const recipeId = req.params.id;

    try {
        if (!recipeId) return res.status(400).json({ message: "Missing recipe" });

        const favoritedRecipe = await Recipe.findById({ _id: recipeId });
        if (!favoritedRecipe) return res.status(404).json({ message: "Recipe not found" });

        const favoritesObj = await Favorites.findOne({ user });
        if (!favoritesObj) return res.status(404).json({ message: "No favorites found" });
        if (!includesRecipeId(favoritesObj, recipeId)) {
            return res.status(409).json({ message: 'Recipe is not in favorites' });
        }

        const newFavorites = favoritesObj.recipes.filter((id) => id.toString() !== recipeId);
        favoritesObj.recipes = newFavorites;

        await favoritesObj.save()
        return res.status(200).json(favoritesObj.recipes);

    } catch (error) {
        console.log("Error removing favorite: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}
