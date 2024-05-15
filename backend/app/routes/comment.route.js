const Express = require('express');
const { createComment, getComments, deleteComment } = require('../controllers/comment.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const commentRouter = Express.Router();

commentRouter.post('/create/:id', authMiddleware, createComment)
commentRouter.get('/recepie/:id', getComments)
commentRouter.delete('/delete/:id', authMiddleware, deleteComment)

module.exports = commentRouter;