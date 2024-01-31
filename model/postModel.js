const mongoose = require('mongoose');

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const moment = require('moment-timezone');


const postSchema = new mongoose.Schema({
    Title: {
        type: String,
    },
    Featureimage: {
        type: String,
    },
    Category: {
        type: String,
    },
    status: {
        type: String,
    },
    Content: {
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId,  //reference to the User model
        ref: "userModel"                //the field in the User model that we are referencing
    },
    createdAt: {
        type: String,
        default: moment().tz(userTimeZone).format()
    },
    updatedAt: {
        type: String,
        default: moment().tz(userTimeZone).format()
    },
    view: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("postSchema", postSchema);