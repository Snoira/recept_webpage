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
// },
// {
//     "email": "blabla@test.se",
//     "password": "testtest123",
//     "firstname": "Klara",
//     "lastname": "Färdiga"
// },
// {
//     "email": "frida@test.se",
//     "password": "fridatestar123",
//     "username": "FridensLiljor"
// },
// {
//     "email": "bengt@test.se",
//     "password": "bengetestar123",
//     "username": "BagarBengt"
// }