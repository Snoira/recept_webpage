const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String, 
            required: true, 
            unique: true,
            mathc: /^[^@]+@[^@]+\.[^@]+$/,
        },
        password: {
            type: String, 
            required: true,
            minlength: 8,
            select: false, //vad är select?
        },
        firstname: {
            type: String, 
            required: true,
        },
        lastname: {
            type: String, 
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
)

userSchema.virtual("fullName").get(function(){ //vad gör denna??
    return `${this.firstName} ${this.lastName}`
})

userSchema.pre("save", async function (next){
    const user = this
    try {
        if(user.isModified("password") || user.isNew){
            user.password = await bcrypt.hash(user.password, 10)
        }
        next()
    } catch(error){
        next(error)
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;