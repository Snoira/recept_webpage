const mongoose = require('mongoose');

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
//                 required: true,
//             },
//             descriptionText: {
//                 type: String,
//                 required: true,
//             }
//         },
//         image: {
//             image: {
//                 type: String,
//                 required: true,
//             },
//             alt: {
//                 type: String,
//                 required: true,
//             }
//         },
//         ingredientList: [
//             {
//                 subGroup: {
//                     type: String,
//                 },
//                 ingredients: [
//                     {
//                         amount: {
//                             type: Number,
//                             required: true,
//                         },
//                         unit: {
//                             type: String,
//                             required: true,
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
//                 step: {
//                     type: Number,
//                     required: true,
//                 },
//                 instruction: {
//                     type: String,
//                     required: true,
//                 }
//             }
//         ]
//     }
// )
// förenklad: 
const recepieSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        recepie: {
            type: String,
            required: true
        }
    }
) 

const Recepie = mongoose.model("Recepie", recepieSchema)
module.exports = Recepie;