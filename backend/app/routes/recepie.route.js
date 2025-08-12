import Express from 'express';
import { createRecepie, getRecepies, getRecepiesByUser, getRecepieById, editRecepie, deleteRecepie, likeRecepie, unlikeRecepie, getLikes } from '../controllers/recepie.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const recepieRouter = Express.Router();

recepieRouter.get("/", getRecepies)
recepieRouter.get("/user/", authMiddleware, getRecepiesByUser)
recepieRouter.get("/:id", getRecepieById)
recepieRouter.post('/create', authMiddleware, createRecepie)
recepieRouter.put("/edit/:id", authMiddleware, editRecepie)
recepieRouter.delete("/delete/:id", authMiddleware, deleteRecepie)
recepieRouter.put("/like/:id", authMiddleware, likeRecepie)
recepieRouter.put("/unlike/:id", authMiddleware, unlikeRecepie)
recepieRouter.get("/get/likes/:id", getLikes)


export default recepieRouter;