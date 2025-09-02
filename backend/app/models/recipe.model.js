import mongoose from "mongoose";

const { Schema } = mongoose;

const ENUM_UNIT = ['l', 'dl', 'cl', 'ml', 'msk', 'tsk', 'krm', 'g', 'hg', 'kg'];
const ENUM_CATEGORY = ['Bakverk', 'Frukost', 'Lunch', 'Middag', 'Efterrätt', 'Dryck', 'Snacks', 'Sallad', 'Sås', 'Vegetariskt', 'Veganskt'];

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
    items: { type: [IngredientItemSchema], required: true }
},
    { _id: false }
)

const StepSchema = new Schema({
    title: { type: String, trim: true, default: null },
    steps: { type: [{ type: String, trim: true, min: 5, max: 1000 }], required: true }
},
    { _id: false }
)

const RecipeSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, trim: true, required: true, min: 2, max: 100 },
        portions: { type: Number, min: 1, max: 100, default: 4, required: true },
        description: { type: String, trim: true, min: 5, max: 1000, required: true },
        time: { type: Number, min: 5, max: 1440, default: null },
        categories: [{ type: String, enum: ENUM_CATEGORY }],

        ingredients: { type: [IngredientGroupSchema], required: true },
        instructions: { type: [StepSchema], required: true },

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