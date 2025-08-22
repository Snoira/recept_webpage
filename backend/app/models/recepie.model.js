import mongoose from "mongoose";

const { Schema } = mongoose;

const ENUM_UNIT = ['l', 'dl', 'cl', 'ml', 'msk', 'tsk', 'krm', 'g', 'hg', 'kg', 'st', 'nypa', 'kvistar', 'förp', 'påse'];
const ENUM_CATEGORY = ['Bakverk', 'Frukost', 'Lunch', 'Middag', 'Efterrätt', 'Dryck', 'Snacks', 'Sallad', 'Sås', 'Vegetariskt', 'Veganskt'];

const IngredientItemSchema = new Schema({
    amount: { type: Number, min: 0, default: null },
    unit: { type: String, enum: ENUM_UNIT, default: null },
    name: { type: String, required: true, trim: true },
    note: { type: String, trim: true, default: "" }
},
    { _id: false }
)

const IngredientSectionSchema = new Schema({
    title: { type: String, trim: true, default: null },
    items: { type: [IngredientItemSchema], required: true }
},
    { _id: false }
)

const StepSchema = new Schema({
    title: { type: String, trim: true, default: null },
    steps: { type: [String], required: true }
},
    { _id: false }
)

const RecipeSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, trim: true, required: true },
        portions: { type: Number, min: 1, default: 4 },
        description: String,
        time: Number,
        categories: [{ type: String, enum: ENUM_CATEGORY }],

        ingredients: { type: [IngredientSectionSchema], required: true },
        instructions: { type: [StepSchema], required: true },

        image: {
            URL: { type: String, trim: true },
            alt: { type: String, trim: true, default: "picture of the recipe" }
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    { timestamps: true }
)

export const Recipe = mongoose.model("Recipe", RecipeSchema)



const recepieSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            portions: {
                type: Number
            },
            time: {
                type: Number
            },
            category: {
                type: String,
                // required: true,
            },
            descriptionText: {
                type: String,
                // required: true,
            }
        },
        image: {
            imageURL: {
                type: String,
                // required: true,
            },
            alt: {
                type: String,
                // required: true,
            }
        },
        ingredientList: [
            {
                amount: {
                    type: Number,
                },
                unit: {
                    type: String,
                    enum: ['l', 'dl', 'cl', 'ml', 'msk', 'tsk', 'krm', 'g', 'hg', 'kg', 'st', 'nypa', 'kvistar', 'förp', 'påse'],
                    // default: 'st'
                },
                ingredient: {
                    type: String,
                    required: true,
                }
            }
        ],
        instructionList: {
            type: [String],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length > 0
                },
                message: "Instructions must be separated by new lines"
            }
        },
        subRecepies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Recepie'
            }
        ],
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
)

const Recepie = mongoose.model("Recepie", recepieSchema)
export default Recepie;
