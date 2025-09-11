import Express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken, getUser } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = Express.Router();

authRouter.post('/register', registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logout", logoutUser)
authRouter.post("/refresh", refreshToken)
authRouter.get("/user", authMiddleware, getUser)

export default authRouter;