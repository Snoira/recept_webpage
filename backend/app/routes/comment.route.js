import Express from 'express';
import { deleteComment, getComments } from '../controllers/comment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const commentRouter = Express.Router();

commentRouter.delete('/:id', authMiddleware, deleteComment);
commentRouter.get('/recipe/:id', getComments);

export default commentRouter;