import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^@]+@[^@]+\.[^@]+$/,
            trim: true,
            lowercase: true,
            minlength: 5,
            maxlength: 100,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            trim: true,
            select: false,
            validate: {
                validator: function (value) {
                    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
                },
                message: "Password must be at least 8 characters long and include a letter, a number, and a special character"
            }
        },
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 30,
            trim: true,

        },
        firstName: {
            type: String,
            maxlength: 50,
            trim: true,
            default: null,
        },
        lastName: {
            type: String,
            maxlength: 50,
            trim: true,
            default: null,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`
});


// userSchema.virtual("defaultAvatar").get(function () { 
//     return `https://avatar.iran.liara.run/username?username=${this.username}&length=1`
// })

userSchema.pre("save", async function (next) {
    const user = this
    try {
        if (user.isModified("password") || user.isNew) {
            user.password = await bcrypt.hash(user.password, 10)
        }
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("User", userSchema)
export default User
