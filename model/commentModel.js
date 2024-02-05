const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Types.ObjectId,
            ref: "postSchema"
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "userModel"
        },
        Comment: {
            type: String,
            Required: "Please enter a comment",
            maxlength: [500, "Your comment is too long"],
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("commentModel", commentSchema);