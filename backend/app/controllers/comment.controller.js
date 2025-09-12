import Recipe from "../models/recipe.model.js";
import Comment from "../models/comment.model.js"
import { isValidObjectId } from 'mongoose';

export async function createComment(req, res) {

    const userId = req.userId
    const recipeId = req.params.id
    const { content } = req.body

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ message: "Invalid recipe id" });
    }

    if (!content) return res.status(400).json({ message: "Content is required" })
    if (content.length < 1) return res.status(400).json({ message: "Content is too short" })
    if (content.length > 500) return res.status(400).json({ message: "Content is too long" })

    try {
        const recipe = await Recipe.findById(recipeId)
        if (!recipe) return res.status(404).json({ message: "Recipe not found" })

        const newComment = await Comment.create({ user: userId, recipe: recipeId, content })

        return res.status(201).json(newComment)

    } catch (error) {
        console.log("Error creating comment: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function getComments(req, res) {
    const recipeId = req.params.id
    try {
        if (!isValidObjectId(recipeId)) {
            return res.status(400).json({ message: "Invalid recipe id" });
        }

        const recipe = await Recipe.findById(recipeId)
        if (!recipe) return res.status(404).json({ message: "Recipe not found" })

        const comments = await Comment.find({ recipe: recipeId })
            .populate("user", "username")
            .sort({ createdAt: -1 })

        return res.status(200).json(comments)

    } catch (error) {
        console.log("Error fetching comments: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteComment(req, res) {

    const commentId = req.params.id
    if (!isValidObjectId(commentId)) {
        return res.status(400).json({ message: "Invalid comment id" });
    }

    const userId = req.userId

    try {
        const comment = await Comment.findById(commentId)
        if (!comment) return res.status(404).json({ message: "Comment not found" })

        if (comment.user.toString() !== userId) {
            return res.status(409).json({ message: "Not authorized to delete this comment" })
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId)

        if (deletedComment) return res.sendStatus(204)

        return res.status(500).json({ message: "Could not delete comment" })
        
    } catch (error) {
        console.log("Error deleting comment: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

