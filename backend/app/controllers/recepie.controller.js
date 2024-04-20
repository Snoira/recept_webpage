const Recepie = require("../models/recepie.model.js")

//lägg till Errorhantering i utils!!! 

async function createRecepie (req, res){
    try{
        const { user, title, recepie } = req.body

        if ( !user || !title || !recepie ) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const recepieInputs = await new Recepie({
            user,
            title,
            recepie
        })
        const newRecepie = await recepieInputs.save()
        console.log("New recepie: ", newRecepie)
        if(newRecepie){
            res.status(201).send(newRecepie);
        } else {
            res.status(400).json({error: "Could not create recepie"})
            // res.status(400).send({ message: "Could not create recepie" });
        }
    } catch(error){
        console.log("Error in createRecepie:", error);
        res.status(400).json({error: error.message})
    }
}

async function getRecepies(req, res){
    try{
        const recepies = await Recepie.find()
        if(recepies){
            res.status(200).json(recepies)
        } else {
            res.status(404).json({error: "No recepies found"})
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createRecepie,
    getRecepies
}