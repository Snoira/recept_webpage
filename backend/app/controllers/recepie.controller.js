const Recepie = require("../models/recepie.model.js")
const User = require("../models/user.model.js")

//lägg till Errorhantering i utils!!! 

async function createRecepie(req, res) {
    const { title, imageURL, alt, portions, time, category, descriptionText, ingredients, instructions, subRecepies } = req.body;
    const createdBy = req.userId
    try {
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
        else instructionList = instructions.split("\n")

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
    const recepieId = req.params.id
    const createdBy = req.userId
    const { title, imageURL, alt, portions, time, category, descriptionText, ingredients, instructions } = req.body;

    try {
        const recepie = await Recepie.findById(recepieId)
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })

        if (recepie.user !== createdBy) return res.status(401).json({ message: "Not authorized to edit this recepie" })
        //kolla så att personen som försöker ändra receptet är samma som den som skapade det, middleware?

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

        let instructionsList = []

        if (!instructions.includes("\n")) return res.status(400).json({ message: "Instructions must be separated by new lines" });
        else instructionsList = instructions.split("\n")

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

        const updatedRecepie = await recepie.findByIdAndUpdate(recepieId, recepieInputs, { new: true })
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
    const createdBy = req.userId

    try {
        const recepie = await Recepie.findById(recepieId)
        if (!recepie) return res.status(404).json({ message: "Recepie not found" })

        if (recepie.user !== createdBy) return res.status(401).json({ message: "Not authorized to edit this recepie" })
        //kolla så att personen som försöker ta bort receptet är samma som den som skapade det, middleware?

        const deletedRecepie = await Recepie.findByIdAndDelete(recepieId)
        if (deletedRecepie) {
            res.status(200).json(deletedRecepie)
        } else {
            res.status(400).json({ error: "Could not delete recepie" })
        }

    } catch (error) {
        console.log("Error in deleteRecepie:", error);
        res.status(500).json({ error: error.message })
    }
}

async function getRecepiesByUser(req, res) {
    const user = req.userId
    try {
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

module.exports = {
    createRecepie,
    getRecepies,
    getRecepiesByUser,
    editRecepie,
    deleteRecepie
}