const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    Title:{
        type:String,
    },
    Featureimage:{
        type:String,
    },
    Category:{
        type:String,
    },
    status:{
        type:String,
    },
    Content:{
        type:String,
    },
    userId:{
        type:mongoose.Types.ObjectId,  //reference to the User model
        ref:"userModel"                //the field in the User model that we are referencing
    }
})

module.exports = mongoose.model("postSchema",postSchema);