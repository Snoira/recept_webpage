const Express = require('express');
const {getRecepieUnits} = require('../controllers/recepieUnits.controller.js');

const recepieUnitsRouter = Express.Router();

recepieUnitsRouter.get("/", getRecepieUnits)

module.exports = recepieUnitsRouter;