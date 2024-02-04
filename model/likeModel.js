const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,  
        ref: "postSchema"                
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userModel"
    },
    count: {
        type: Number,
        default: 0,
    },
    time: {
        timestamps: true
    }
})

module.exports = mongoose.model("likeModel",likeSchema);