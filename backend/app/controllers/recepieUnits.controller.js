const RecepieUnits = require('../models/recepieUnits.model.js');
const { readDatabaseFile } = require('../utils/database.js');

async function getRecepieUnits(req, res) {
    try {
        const recepieUnits = await readDatabaseFile('./app/data/recepieUnits.data.json')
        if (recepieUnits && recepieUnits.length > 0) {
            res.status(200).json(recepieUnits)
        } else {
            res.status(404).json({ error: "No recepie units found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getRecepieUnits}