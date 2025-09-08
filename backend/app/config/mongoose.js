import mongoose from 'mongoose';

const databaseURI = process.env.DATABASE_PATH

export function connect(dbURI = databaseURI){
    mongoose 
    .connect(dbURI)
    .then(()=>{
        console.log("Mongoose has connected")
    })
    .catch((error) => {
        console.log("ERROR: Mongoose did not connect", error)
    })
}

// const connect = async (DATABASE_PATH) => {
//     try {
//         await mongoose.connect(DATABASE_PATH)
//         console.log("Mongoose has connected to, ", DATABASE_PATH)
//     } catch (error) {
//         console.log("ERROR: Mongoose did not connect", error)
//     }
// }
