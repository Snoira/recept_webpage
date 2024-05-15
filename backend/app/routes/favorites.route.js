const Express = require('express');
const { addToFavorites, getFavorites, removeFavorite } = require('../controllers/favorites.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const favoritesRouter = Express.Router();

favoritesRouter.post('/add/:id', authMiddleware, addToFavorites)
favoritesRouter.get('/', authMiddleware, getFavorites)
favoritesRouter.put('/remove/:id', authMiddleware, removeFavorite)
// favoritesRouter.post('/add/:id', addToFavorites)
// favoritesRouter.put('/remove/:id', removeFavorite)

module.exports = favoritesRouter;