const mongoose = require('mongoose');

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const moment = require('moment-timezone');

const postSchema = new mongoose.Schema({
    Title: {
        type: String,
        required:true,
    },
    Featureimage: {
        type: String,
        required:true,
    },
    imageId:{
        type:String,
    },
    Category: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        required:true,
    },
    Content: {
        type: String,
        required:true,
    },
    userId: {
        type: mongoose.Types.ObjectId,  //reference to the User model
        ref: "userModel"                //the field in the User model that we are referencing
    },
    createdAt: {
        type: String,
        default: moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
    },
    updatedAt: {
        type: String,
        default: moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
    },
    view: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model("postSchema", postSchema);