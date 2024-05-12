const Recepie = require("../models/recepie.model.js")
const User = require("../models/user.model.js")

//lägg till Errorhantering i utils!!! 

async function createRecepie(req, res) {
    const { title, imageURL, alt, portions, time, category, descriptionText, ingredients, instructions, subRecepies } = req.body;
    const createdBy = req.userId
    try {

        if (!title) return res.status(400).json({ message: "Missing title" });
        else if (!portions || !time || !category || !descriptionText) return res.status(400).json({ message: "Missing description information" });
        else if (!imageURL || !alt) return res.status(400).json({ message: "Missing image information" });
        else if (!ingredients || ingredients === "") return res.status(400).json({ message: "Missing ingredientList" });
        else if (!instructions || instructions === "") return res.status(400).json({ message: "Missing instructions" })
        else {
            if (subRecepies && subRecepies.length > 0) {
                subRecepies.forEach(obj => {
                    const recepie = Recepie.findById(obj)
                    if (!recepie) {
                        return res.status(404).json({ message: "SubRecepie not found" }); //400 eller 404?
                    }
                })
            }
        }

        //redunant kod?
        const user = await User.findById(createdBy)
        if (!user) return res.status(404).json({ message: "User not found" })

        //kan jag använda mig av en funktion för att skapa ingredientList och instructionList?
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
        else instructionList = instructions.split("\n").filter(item => item !== "")

        const recepieInputs = {
            user,
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

        const newRecepie = await Recepie.create(recepieInputs)
        await newRecepie.populate("user")
        if (newRecepie) {
            res.status(201).send(newRecepie);
        } else {
            res.status(400).json({ error: "Could not create recepie" })
        }

    } catch (error) {
        console.log("Error in createRecepie:", error);
        res.status(500).json({ error: error.message })
    }
}

async function getRecepies(req, res) {

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

async function editRecepie(req, res) {
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

        //finns det ett annat sätt att uppdatera produkten på? 
        //Hur gör jag med värdena son finns i array-form? alltså ändra på en specifik del i arrayen?

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

async function deleteRecepie(req, res) {
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

async function getRecepiesByUser(req, res) {
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

async function getRecepieById(req, res) {
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

module.exports = {
    createRecepie,
    getRecepies,
    getRecepiesByUser,
    getRecepieById,
    editRecepie,
    deleteRecepie
}