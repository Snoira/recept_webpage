const Express = require('express');
const { createRecepie, getRecepies, getRecepiesByUser, editRecepie, deleteRecepie } = require('../controllers/recepie.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const recepieRouter = Express.Router();

recepieRouter.get("/", getRecepies)
recepieRouter.post('/create', authMiddleware, createRecepie)
recepieRouter.post("/user", getRecepiesByUser)
recepieRouter.put("/edit/:id", authMiddleware, editRecepie)
recepieRouter.delete("/delete/:id", deleteRecepie)

module.exports = recepieRouter;