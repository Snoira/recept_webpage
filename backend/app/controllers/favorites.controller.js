const Favorites = require('../models/favorites.model');
const Recepie = require('../models/recepie.model');

async function addToFavorites(req, res) {
    // borde ändra till tydligare namn på variabler
    // const userId = req.body.user;
    const userId = req.userId;
    const recipeId = req.params.id;
    try {
        if (!recipeId) return res.status(400).json({ message: "Missing recipe" });

        const favoriteRecepie = await Recepie.findById({ _id: recipeId });
        if (!favoriteRecepie) return res.status(404).json({ message: "Recipe not found" });

        const createdBy = favoriteRecepie.user.toString();
        if (createdBy === userId) return res.status(401).json({ message: "One cannot favorite their own recepies" })

        const savedFavorites = await Favorites.findOne({ user: userId });
        if (!savedFavorites) {
            const newSavedFavorites = await Favorites.create({ user: userId, recepieList: [recipeId] });
            await newSavedFavorites.populate("recepieList");

            if (newSavedFavorites) res.status(201).send(newSavedFavorites.recepieList);
            else res.status(400).json({ message: "Error creating favorite" }); //vilken felkod?

        } else {
            if (savedFavorites.recepieList.includes(recipeId)) throw new Error('Recipe is already in favorites');
            else savedFavorites.recepieList.push(recipeId);

            const updatedFavorites = await savedFavorites.save();
            if (updatedFavorites) {
                // await updatedFavorites.populate("recepieList");
                res.status(200).send(updatedFavorites.recepieList);
            } else {
                res.status(400).json({ message: "Error updating favorite" }); //vilken felkod?
            }
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error creating favorite: ", error.message);
    }
}

async function getFavorites(req, res) {
    const user = req.userId;
    try {
        const savedFavorites = await Favorites.findOne({ user });
        if (!savedFavorites) return res.status(404).json({ message: "No favorites found" });
        // if (savedFavorites.recepieList.length > 0) await savedFavorites.populate("recepieList");
        res.status(200).send(savedFavorites.recepieList);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function removeFavorite(req, res) {
    // const userId = req.body.user;
    const userId = req.userId;
    const recipeId = req.params.id;
    try {
        if (!recipeId) return res.status(400).json({ message: "Missing recipe" });

        const favoriteRecepie = await Recepie.findById({ _id: recipeId });
        if (!favoriteRecepie) return res.status(404).json({ message: "Recipe not found" });

        const savedFavorites = await Favorites.findOne({ user: userId });
        if (!savedFavorites) return res.status(404).json({ message: "No favorites found" });
        if (!savedFavorites.recepieList.includes(recipeId)) return res.status(404).json({ message: 'Recipe is not in favorites' });

        const newSavedFavorites = savedFavorites.recepieList.filter((id) => id.toString() !== recipeId);
        savedFavorites.recepieList = newSavedFavorites;

        const updatedFavorites = await savedFavorites.save();
        // if (updatedFavorites.recepieList.length > 0) await updatedFavorites.populate("recepieList");
        if (updatedFavorites) {
            res.status(200).send(updatedFavorites.recepieList);
        } else {
            res.status(400).json({ message: "Error removing favorite" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error removing favorite: ", error.message);
    }
}

module.exports = {
    addToFavorites,
    getFavorites,
    removeFavorite
};