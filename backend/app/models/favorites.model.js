const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoritesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        }
    ]
}, {
    timestamps: true
})

const Favorites = mongoose.model('Favorites', favoritesSchema)
module.exports = Favorites