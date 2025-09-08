import mongoose from "mongoose";
import { ENUM_UNIT, ENUM_CATEGORY } from "../utils/validation.js";

const { Schema } = mongoose;

const arrayLimit = (max) => {
    return function (val) {
        return val.length <= max;
    };
};

const IngredientItemSchema = new Schema({
    amount: { type: Number, min: 0.5, max: 1000, default: null },
    unit: { type: String, enum: ENUM_UNIT, default: null },
    name: { type: String, required: true, trim: true, min: 2, max: 100 },
    note: { type: String, trim: true, max: 100, default: null }
},
    { _id: false }
)

const IngredientGroupSchema = new Schema({
    title: { type: String, trim: true, default: null },
    items: { 
        type: [IngredientItemSchema], 
        required: true,
        validate: [arrayLimit(30), '{PATH} exceeds the limit of 30 items']
    }
},
    { _id: false }
)

const RecipeSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, trim: true, required: true, min: 2, max: 100 },
        portions: { type: Number, default: 4, required: true, min: 1, max: 100 },
        description: { type: String, trim: true, required: true, min: 5, max: 1000 },
        time: { type: Number, default: null, min: 5, max: 1440 },
        categories: {
            type: [{ type: String, enum: ENUM_CATEGORY }],
            default: null,
            validate: [arrayLimit(3), '{PATH} exceeds the limit of 3 categories']
        },
        ingredients: {
            type: [IngredientGroupSchema],
            required: true,
            validate: [arrayLimit(10), '{PATH} exceeds the limit of 10 groups']
        },
        instructions: {
            type: [{ type: String, trim: true, min: 5, max: 1000 }],
            required: true,
            validate: [arrayLimit(50), '{PATH} exceeds the limit of 50 steps']
        },
        image: {
            URL: { type: String, trim: true },
            alt: { type: String, trim: true, min: 2, max: 500 }
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    { timestamps: true }
)

const Recipe = mongoose.model("Recipe", RecipeSchema)
export default Recipe;