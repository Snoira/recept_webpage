import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^@]+@[^@]+\.[^@]+$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
            validate: {
                validator: function (value) {

                    return value.length > 7

                },
                message: "Password must be at least 8 characters long"
            }
        },
        username: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: async function (value) {
                    // const user = await User.findOne({
                    //     username: value
                    // })
                    return value.length > 3
                },
                message: "Username must be at least 3 characters long"
            }
        },
        // role: {
        //     type: String,
        //     enum: ["user", "admin"],
        //     default: "user",
        // },
        avatar: {
            type: String,
        },
        // favorites: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Recipe",
        //     }
        // ],
        rating: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
)

// userSchema.virtual("fullName").get(function () { 
//     return `${this.firstName} ${this.lastName}`
// })
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
