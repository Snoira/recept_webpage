import mongoose from "mongoose";
const { Schema } = mongoose;

const favoritesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recepieList: [{
        type: Schema.Types.ObjectId,
        ref: 'Recepie',
    }]
  
}, {
    timestamps: true
})

const Favorites = mongoose.model('Favorites', favoritesSchema)
export default Favorites;
