import Recipe from '../models/recipe.model.js';
import { isValidObjectId } from 'mongoose';

// const updateAuthorLikeCount = async (authorId) => {
//     const recipeAuthor = await User.findById(authorId);
//     if (recipeAuthor) {
//         const likeCount = await Recipe.aggregate([
//             { $match: { user: recipeAuthor._id } },
//             { $unwind: "$likes" },
//             { $group: { _id: "$user", totalLikes: { $sum: 1 } } }
//         ]);

//         if (likeCount.length > 0) {
//             recipeAuthor.totalLikes = likeCount[0].totalLikes;
//         } else {
//             recipeAuthor.totalLikes = 0;
//         }

//         await recipeAuthor.save();
//         return true;

//     } else return false;
// }

//TODO: 
// move like count to user model, virtualize field. mycket snabbare. 

export async function likeRecipe(req, res) {
    const userId = req.userId;
    const recipeId = req.params.id;

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ message: "Invalid recipe id" });
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if (recipe.author.toString() === userId) {
            return res.status(400).json({ message: "You cannot like your own recipe" });
        }

        if (recipe.likes.includes(userId)) {
            return res.status(409).json({ message: "You have already liked this recipe" });
        }
        
        recipe.likes.push(userId);
        console.log("recipe likes after push: ", recipe.likes);

        await recipe.save();
        return res.status(201).json(recipe.likes);

    } catch (error) {
        console.log("Error liking recipe: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}

export async function unlikeRecipe(req, res) {
    const userId = req.userId;
    const recipeId = req.params.id;

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ message: "Invalid recipe id" });
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if (recipe.author.toString() === userId) {
            return res.status(400).json({ message: "You cannot like your own recipe" });
        }

        if (!recipe.likes.includes(userId)) {
            return res.status(409).json({ message: "You have not liked this recipe yet" });
        }

        recipe.likes = recipe.likes.filter(id => id.toString() !== userId);
        await recipe.save();

        console.log("recipe likes after unlike: ", recipe.likes);
        return res.status(201).json(recipe.likes);

    } catch (error) {
        console.log("Error unliking recipe: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}

export async function getRecipeLikes(req, res) {
    const recipeId = req.params.id;
    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ message: "Invalid recipe id" });
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        return res.status(200).json(recipe.likes);

    } catch (error) {
        console.log("Error fetching recipe likes: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}