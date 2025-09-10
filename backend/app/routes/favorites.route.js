import Express from 'express';
import { addFavorite, getFavorites, removeFavorite, getFavoritesPopulated } from '../controllers/favorites.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const favoritesRouter = Express.Router();

favoritesRouter.post('/add/:id', authMiddleware, addFavorite)
favoritesRouter.get('/', authMiddleware, getFavorites)
favoritesRouter.put('/remove/:id', authMiddleware, removeFavorite)
favoritesRouter.get('/populated', authMiddleware, getFavoritesPopulated)

export default favoritesRouter;