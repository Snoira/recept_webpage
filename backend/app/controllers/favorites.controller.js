const Favorites = require('../models/favorites.model');

async function createFavorite(req, res) {
    try {
        const { user, recipe } = req.body;
        if (!user) {
            return res.status(400).json({ message: "Missing user" });
        } else if (!recipe) {
            return res.status(400).json({ message: "Missing recipe" });
        } else {
            const favorite = new Favorites({
                user,
                recipe
            })
            const newFavorite = await favorite.save()
            console.log("New favorite: ", newFavorite)
            if (newFavorite) {
                res.status(201).send(newFavorite);
            } else {
                res.status(400).json({ message: "Error creating favorite" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error creating favorite: ", error.message);
    }
}