const Favorites = require('../models/favorites.model');
const Recepie = require('../models/recepie.model');

async function addToFavorites(req, res) {
    try {
        const userId = req.userId;
        const recipeId = req.params.id;
        
        if (!recipeId) return res.status(400).json({ message: "Missing recipe" }); 

        const favoriteRecepie = await Recepie.findById({ recipeId });
        if (!favoriteRecepie) return res.status(404).json({ message: "Recipe not found" });
        if (favoriteRecepie.user === userId) return res.status(401).json({ message: "One cannot favorite their own recepies" })
        //flytta ned denna till om användaren över huvud taget har favorites?
        else if (Favorites.recepieList.includes(recipeId)) throw new Error('Recipe is already in favorites');

        const favorite = await Favorites.findOne({ user: userId });
        if (!favorite) {
            const newFavorite = await Favorites.create({ user: userId, recepieList: [recipeId] });
            if (newFavorite) {
                res.status(201).send(newFavorite.recepieList);
            } else {
                res.status(400).json({ message: "Error creating favorite" }); //vilken felkod?
            }
        } else {
            favorite.recepieList.push(recipeId);
            const updatedFavorite = await favorite.save();
            if (updatedFavorite) {
                res.status(200).send(updatedFavorite);
            } else {
                res.status(400).json({ message: "Error updating favorite" }); //vilken felkod?
            }
        }
        //insåg precis att man kan använda svaret för att uppdatera sidan i frontend så att den uppdaterade versionen syns.
     
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error creating favorite: ", error.message);
    }
}

async function getFavorites(req, res) {
    const user = req.userId;
    try {
        const favorites = await Favorites.findOne({ user });
        await favorites.populate("recepieList");
    if (favorites) {
        res.status(200).json(favorites);
    } else {
        res.status(404).json({ message: "No favorites found" });
    }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function removeFavorite(req, res) {
    try {
        const user = req.userId;
        const recipeId = req.params.id;
        if (!recipeId) return res.status(400).json({ message: "Missing recipe" });

        const favoriteRecepie = await Recepie.findById({ recipeId });
        if (!favoriteRecepie) return res.status(404).json({ message: "Recipe not found" });

        if (!Favorites.recepieList.includes(recipeId)) throw new Error('Recipe is not in favorites');

        const newFavorites = Favorites.recepieList.filter((id) => id !== recipeId);
        console.log("newFavorites", newFavorites)
        const updatedFavorites = await Favorites.save();
        if (updatedFavorites) {
            res.status(200).send(updatedFavorites);
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