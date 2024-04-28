const Express = require('express');
const { createRecepie, getRecepies, editRecepie } = require('../controllers/recepie.controller.js');

const recepieRouter = Express.Router();

recepieRouter.post('/create', createRecepie)
recepieRouter.get("/", getRecepies)
recepieRouter.get("/edit/:id", editRecepie)

module.exports = recepieRouter;