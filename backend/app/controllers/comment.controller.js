const Recepie = require("../models/recepie.model.js")
const User = require("../models/user.model.js")
const Comment = require("../models/comment.model.js")

async function createComment(req, res) {
    const { content } = req.body

    const { id } = req.params
    const userId = req.userId
    try {
        const recepie = await Recepie.findById(id)
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })
        // är denna egentligen nödvänding iom token?
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: "User not found" })
        const newComment = await Comment.create({ user: userId, recepie: id, content })

        if (newComment) {
            await newComment.populate("user")
            console.log("newComment: ", newComment)
            res.status(201).json(newComment)
        } else {
            res.status(400).json({ message: "Error creating review" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error creating review: ", error.message)
    }
}

async function getComments(req, res) {
    const { id } = req.params
    try {
        const recepie = await Recepie.findById(id)
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })

        const comments = await Comment.find({ recepie: id }).populate("user")
        if (comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "No comments found" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error fetching comments: ", error.message)
    }
}

async function deleteComment(req, res) {
    const { id } = req.params
    const userId = req.userId
    try {
        const comment = await Comment.findById(id)
        if (!comment) return res.status(404).json({ message: "Comment not found" })
        if (comment.user.toString() !== userId) return res.status(401).json({ message: "Not authorized to delete this comment" })

        const deletedComment = await Comment.findByIdAndDelete(id)
        if (deletedComment) {
            res.status(204).send()
        } else {
            res.status(400).json({ message: "Error deleting comment" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error deleting comment: ", error.message)
    }
}

module.exports = { createComment, getComments, deleteComment }
