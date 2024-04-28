const Recepie = require("../models/recepie.model.js")

//lägg till Errorhantering i utils!!! 

async function createRecepie(req, res) {
    try {
        console.log("req.body: ", req.body)
        const {
            user,
            title,
            description,
            image,
            ingredientList,
            instructions,
            subRecepies
        } = req.body;

        //det måste finnas ett bättre sätt att göra detta på
        if (!user) {
            return res.status(400).json({ message: "Missing user" });
        } else if (!title) {
            return res.status(400).json({ message: "Missing title" });
        } else if (!description || !description.portions || !description.time || !description.category || !description.descriptionText) {
            return res.status(400).json({ message: "Missing description" });
        } else if (!image || !image.imageURL || !image.alt) {
            return res.status(400).json({ message: "Missing image" });
        } else if (!ingredientList || ingredientList.length === 0) {
            return res.status(400).json({ message: "Missing ingredientList" });
        } else if (!instructions || instructions.length === 0) {
            return res.status(400).json({ message: "Missing instructions" });
        } else {
            ingredientList.forEach(obj => {
                if (!obj.ingredient) {
                    return res.status(400).json({ message: "Missing ingredient" });
                }
            })
            if (subRecepies.length > 0) {
                subRecepies.forEach(obj => {
                    const recepie = Recepie.findById(obj)
                    if (!recepie) {
                        return res.status(404).json({ message: "SubRecepie not found" }); //400 eller 404?
                    }
                })
            }
        }

        const recepieInputs = new Recepie({
            user,
            title,
            description,
            image,
            ingredientList,
            instructions,
            subRecepies
        })
        const newRecepie = await recepieInputs.save()
        console.log("New recepie: ", newRecepie)
        if (newRecepie) {
            res.status(201).send(newRecepie);
        } else {
            res.status(400).json({ error: "Could not create recepie" })
            // res.status(400).send({ message: "Could not create recepie" });
        }
    } catch (error) {
        console.log("Error in createRecepie:", error);
        res.status(400).json({ error: error.message })
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
    try {
        const recepie = await Recepie.findById(req.params.id)
        if (!recepie) {
            return res.status(404).json({ message: "Recepie not found" })
        }

        //kolla så att personen som försöker ändra receptet är samma som den som skapade det, middleware?

        const {
            user,
            title,
            description,
            image,
            ingredientList,
            instructions,
            subRecepies
        } = req.body;

        if (!user) {
            return res.status(400).json({ message: "Missing user" });
        } else if (!title) {
            return res.status(400).json({ message: "Missing title" });
        } else if (!description || !description.portions || !description.time || !description.category || !description.descriptionText) {
            return res.status(400).json({ message: "Missing description" });
        } else if (!image || !image.imageURL || !image.alt) {
            return res.status(400).json({ message: "Missing image" });
        } else if (!ingredientList || ingredientList.length === 0) {
            return res.status(400).json({ message: "Missing ingredientList" });
        } else if (!instructions || instructions.length === 0) {
            return res.status(400).json({ message: "Missing instructions" });
        } else {
            ingredientList.forEach(obj => {
                if (!obj.ingredient) {
                    return res.status(400).json({ message: "Missing ingredient" });
                }
            })
            if (subRecepies.length > 0) {
                subRecepies.forEach(obj => {
                    const recepie = Recepie.findById(obj)
                    if (!recepie) {
                        return res.status(404).json({ message: "SubRecepie not found" }); //400 eller 404?
                    }
                })
            }
        }

        //detta ser lite konstigt ut, måste gå att förenkla?
        recepie.user = user
        recepie.title = title
        recepie.description = description
        recepie.image = image
        recepie.ingredientList = ingredientList
        recepie.instructions = instructions
        recepie.subRecepies = subRecepies

        const updatedRecepie = await recepie.save()
        console.log("Updated recepie: ", updatedRecepie)
        res.status(200).json(updatedRecepie)
    } catch (error) {
        console.log("Error in editRecepie:", error);
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    createRecepie,
    getRecepies,
    editRecepie
}