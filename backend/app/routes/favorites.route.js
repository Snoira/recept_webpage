import Express from 'express';
import { addToFavorites, getFavorites, removeFavorite } from '../controllers/favorites.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const favoritesRouter = Express.Router();

favoritesRouter.post('/add/:id', authMiddleware, addToFavorites)
favoritesRouter.get('/', authMiddleware, getFavorites)
favoritesRouter.put('/remove/:id', authMiddleware, removeFavorite)

export default favoritesRouter;