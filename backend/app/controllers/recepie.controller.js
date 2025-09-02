import Recepie from "../models/recepie.model.js";
import Recipe from "../models/recipe.model.js";
import User from "../models/user.model.js";
import { recipeSchema } from "../utils/validation.js";
import { ZodError, prettifyError } from "zod";

//errorhantering till utils, men ej prio

export async function createRecepie(req, res) {

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

export async function getRecepies(req, res) {

    try {
        const recepies = await Recepie.find()
        if (recepies) {
            res.status(200).json(recepies)
        } else {
            res.status(404).json({ error: "No recepies found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function editRecepie(req, res) {
    const reqBy = req.userId
    const recepieId = req.params.id
    const { title, imageURL, alt, portions, time, category, descriptionText, ingredients, instructions, subRecepies, _id } = req.body;

    try {
        if (recepieId !== _id) return res.status(400).json({ message: "The recepies don't match." })

        const recepie = await Recepie.findById(recepieId)
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })
        const createdBy = recepie.user.toString()
        console.log("createdBy: ", createdBy)
        if (createdBy !== reqBy) return res.status(401).json({ message: "Not authorized to edit this recepie" })

        if (!title) {
            return res.status(400).json({ message: "Missing title" });
        } else if (!portions || !time || !category || !descriptionText) {
            return res.status(400).json({ message: "Missing description information" });
        } else if (!imageURL || !alt) {
            return res.status(400).json({ message: "Missing image information" });
        } else if (!ingredients || ingredients === "") {
            return res.status(400).json({ message: "Missing ingredientList" });
        } else if (!instructions || instructions === "") {
            return res.status(400).json({ message: "Missing instructions" });
        } else {
            if (subRecepies.length > 0) {
                subRecepies.forEach(obj => {
                    const recepie = Recepie.findById(obj)
                    if (!recepie) {
                        return res.status(404).json({ message: "SubRecepie not found" }); //400 eller 404?
                    }
                })
            }
        }

        const ingredientList = ingredients.split("\n").map((item) => {
            if (item === "") return
            else if (!item.includes("-")) return { ingredient: item }
            else {
                const [amount, unit, ingredient] = item.split("-")
                return { amount: parseFloat(amount), unit, ingredient }
            }
        })

        let instructionList = []

        if (!instructions.includes("\n")) return res.status(400).json({ message: "Instructions must be separated by new lines" });
        else instructionList = instructions.split("\n")

        const recepieInputs = {
            title,
            image: {
                imageURL,
                alt
            },
            description: {
                portions,
                time,
                category,
                descriptionText
            },
            ingredientList,
            instructionList,
        }

        const updatedRecepie = await Recepie.findByIdAndUpdate(recepieId, recepieInputs, { new: true })
        console.log("Updated recepie: ", updatedRecepie)
        if (updatedRecepie) {
            res.status(200).json(updatedRecepie)
        } else {
            res.status(400).json({ error: "Could not update recepie" })
        }

    } catch (error) {
        console.log("Error in editRecepie:", error);
        res.status(500).json({ error: error.message })
    }
}

export async function deleteRecepie(req, res) {
    const recepieId = req.params.id
    const reqBy = req.userId

    try {
        const recepie = await Recepie.findById(recepieId)
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })

        const createdBy = recepie.user.toString()
        console.log("createdBy: ", createdBy)
        if (createdBy !== reqBy) return res.status(401).json({ message: "Not authorized to delete this recepie" })

        const deletedRecepie = await Recepie.findByIdAndDelete(recepieId)
        if (deletedRecepie) {
            res.status(204).json(deletedRecepie)
        } else {
            res.status(400).json({ error: "Could not delete recepie" })//kod?
        }
    } catch (error) {
        console.log("Error in deleteRecepie:", error);
        res.status(500).json({ error: error.message })
    }
}

export async function getRecepiesByUser(req, res) {
    try {
        const user = req.userId
        if (!user) return res.status(400).json({ message: "Missing user" })
        const recepies = await Recepie.find({ user: user })
        if (recepies) {
            res.status(200).json(recepies)
        } else {
            res.status(404).json({ error: "No recepies found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getRecepieById(req, res) {
    const recepieId = req.params.id
    try {
        const recepie = await Recepie.findById(recepieId)
        await recepie.populate("user")
        if (recepie) {
            res.status(200).json(recepie)
        } else {
            res.status(404).json({ error: "Recepie not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function likeRecepie(req, res) {
    const recepieId = req.params.id
    const userId = req.userId
    try {
        const recepie = await Recepie.findById({ _id: recepieId })
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })

        const user = await User.findById({ _id: userId })
        if (!user) return res.status(404).json({ message: "User not found" })

        if (recepie.user.toString() === userId) return res.status(401).json({ message: "One cannot like their own recepies" })

        if (recepie.likes.includes(userId)) return res.status(400).json({ message: "Already liked" })

        recepie.likes.push(userId)
        const updatedRecepie = await recepie.save()

        if (updatedRecepie) {
            res.status(200).json(updatedRecepie)

            const createdBy = await User.findById(recepie.user)
            if (createdBy) {
                console.log("createdBy: ", createdBy)
                const likeCount = await Recepie.aggregate([
                    { $match: { user: createdBy._id } },
                    { $unwind: "$likes" },
                    { $group: { _id: "$user", totalLikes: { $sum: 1 } } }
                ]);
                if (likeCount.length > 0) {
                    createdBy.rating = likeCount[0].totalLikes
                } else {
                    createdBy.rating = 0
                }
                console.log("createdBy.rating: ", createdBy.rating)
                await createdBy.save()

            } else {
                res.status(404).json({ message: "Recepie creator not found" });
            }

        } else {
            res.status(400).json({ error: "Could not like recepie" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function unlikeRecepie(req, res) {
    const recepieId = req.params.id
    const userId = req.userId
    try {
        const recepie = await Recepie.findById({ _id: recepieId })
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })

        const user = await User.findById({ _id: userId })
        if (!user) return res.status(404).json({ message: "User not found" })

        if (recepie.user.toString() === userId) return res.status(401).json({ message: "One cannot like their own recepies" })

        if (!recepie.likes.includes(userId)) return res.status(400).json({ message: "Not liked" })
        recepie.likes = recepie.likes.filter(id => id.toString() !== userId)

        const updatedRecepie = await recepie.save()

        if (updatedRecepie) {
            res.status(200).json(updatedRecepie)

            const createdBy = await User.findById(recepie.user)
            if (createdBy) {
                console.log("createdBy: ", createdBy)
                const likeCount = await Recepie.aggregate([
                    { $match: { user: createdBy._id } },
                    { $unwind: "$likes" },
                    { $group: { _id: "$user", totalLikes: { $sum: 1 } } }
                ]);
                if (likeCount.length > 0) {
                    // res.json({ totalLikes: result[0].totalLikes });
                    createdBy.rating = likeCount[0].totalLikes
                } else {
                    // res.json({ totalLikes: 0 });
                    createdBy.rating = 0
                }
                console.log("createdBy.rating: ", createdBy.rating)
                const newLikes = await createdBy.save()
                console.log("newLikes: ", newLikes)
            } else {
                res.status(404).json({ message: "Recepie creator not found" });
            }


        } else {
            res.status(400).json({ error: "Could not like recepie" })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getLikes(req, res) {
    const recepieId = req.params.id
    try {
        const recepie = await Recepie.findById(recepieId)
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })
        const likes = recepie.likes
        if (likes) {
            res.status(200).json(likes)
        } else {
            res.status(404).json({ error: "No likes found" })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
