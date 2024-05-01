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
                    enum: ['l', 'dl', 'cl', 'ml', 'msk', 'tsk', 'krm', 'g', 'hg', 'kg', 'st', ' '],
                    default: ' '
                },
                ingredient: {
                    type: String,
                    required: true,
                }
            }
        ],
        instructions: [
            {
                type: String,
                required: true
            }
        ],
        subRecepies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Recepie'
            }
        ]
    }
)

// const recepieSchema = new Schema(
//     {
//         user: {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//             required: true
//         },
//         title: {
//             type: String,
//             required: true,
//         },
//         description: {
//             portions: {
//                 type: Number
//             },
//             time: {
//                 type: Number
//             },
//             category: {
//                 type: String,
//                 // required: true,
//             },
//             descriptionText: {
//                 type: String,
//                 // required: true,
//             }
//         },
//         image: {
//             imageURL: {
//                 type: String,
//                 // required: true,
//             },
//             alt: {
//                 type: String,
//                 // required: true,
//             }
//         },
//         ingredients: [
//             object = {
//                 listName: {
//                     type: String,
//                 },
//                 ingredientList: [
//                     object = {
//                         amount: {
//                             type: Number,
//                         },
//                         unit: {
//                             type: String,
//                         },
//                         ingredient: {
//                             type: String,
//                             required: true,
//                         }
//                     }
//                 ]
//             }
//         ],
//         instructions: [
//             {
//                 type: String,
//                 required: true
//             }
//         ]
//     }
// )

// förenklad: 
// const recepieSchema = new mongoose.Schema(
//     {
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true
//         },
//         title: {
//             type: String,
//             required: true,
//         },
//         recepie: {
//             type: String,
//             required: true
//         }
//     }
// ) 

const Recepie = mongoose.model("Recepie", recepieSchema)
module.exports = Recepie;