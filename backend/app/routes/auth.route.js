const Express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller.js');

const authRouter = Express.Router();

authRouter.post('/register', registerUser)
authRouter.post("/login", loginUser)

module.exports = authRouter;