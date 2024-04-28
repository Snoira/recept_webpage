const Express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/auth.controller.js');

const authRouter = Express.Router();

authRouter.post('/register', registerUser)
authRouter.post("/login", loginUser)
authRouter.get("/users", getUsers)

module.exports = authRouter;

// {
//     "email": "nora@velde.se",
//     "password": "testtest8",
//     "firstname": "Nora",
//     "lastname": "Velde"
// }