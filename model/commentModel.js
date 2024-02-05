const mongoose = require('mongoose');
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const moment = require('moment-timezone');


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
        createdAt: {
            type: String,
            default: moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
        },
        updatedAt: {
            type: String,
            default: moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
        },
    }
);

module.exports = mongoose.model("commentModel", commentSchema);