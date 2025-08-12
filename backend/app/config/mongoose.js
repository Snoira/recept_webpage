import mongoose from 'mongoose';

const databaseURI = process.env.DATABASE_PATH

export function connect(){
    mongoose 
    .connect(databaseURI)
    .then(()=>{
        console.log("Mongoose has connected to, ", databaseURI)
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
