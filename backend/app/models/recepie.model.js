const mongoose = require('mongoose');

const { Schema } = mongoose;

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
                    enum: ['l', 'dl', 'cl', 'ml', 'msk', 'tsk', 'krm', 'g', 'hg', 'kg', 'st', 'nypa', 'kvistar', 'förp'],
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
module.exports = Recepie;