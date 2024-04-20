const Express = require('express');
const { createRecepie, getRecepies } = require('../controllers/recepie.controller.js');

const recepieRouter = Express.Router();

recepieRouter.post('/create', createRecepie)
recepieRouter.get("/", getRecepies)

module.exports = recepieRouter;