import Express from 'express';
import { createComment, getComments, deleteComment } from '../controllers/comment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const commentRouter = Express.Router();

commentRouter.post('/create/:id', authMiddleware, createComment)
commentRouter.get('/recepie/:id', getComments)
commentRouter.delete('/delete/:id', authMiddleware, deleteComment)

export default commentRouter;