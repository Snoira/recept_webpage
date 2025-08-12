import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recepie: {
        type: Schema.Types.ObjectId,
        ref: 'Recepie',
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment;
