const Express = require('express');
const { addToFavorites, getFavorites, removeFavorite } = require('../controllers/favorites.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const favoritesRouter = Express.Router();

favoritesRouter.post('/add/:id', authMiddleware, addToFavorites)
favoritesRouter.get('/', authMiddleware, getFavorites)
favoritesRouter.delete('/remove/:id', authMiddleware, removeFavorite)

module.exports = favoritesRouter;