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
})

module.exports = mongoose.model("likeModel",likeSchema);