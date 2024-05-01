const mongoose = require('mongoose');

const recepieUnitsSchema = new mongoose.Schema(
    {
        unit: {
            type: String,
            required: true,
            unique: true,
        }
    }
)

const RecepieUnits = mongoose.model('RecepieUnits', recepieUnitsSchema)
module.exports = RecepieUnits