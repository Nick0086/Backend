const userModel = require("../model/userModel");
const postmodel = require("../model/postModel");
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const moment = require('moment-timezone');

// function for create post
exports.createPost = async (req, res) => {
    try {

        const postData = await postmodel.create(req.body);
        res.status(200).json({
            status: "Success",
            message: "Post Create successfully",
            data: postData,
        });

    } catch (error) {
        res.status(404).json({
            status: "failed",
            massage: error.message,
        });
    }
};

// function for get all post
exports.allPosts = async (req, res) => {
    try {

        const postData = await postmodel.find().populate("userId", "-password");
        res.status(200).json({
            status: "Success",
            data: postData,
        });

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Get All Posts Failed",
            error
        });
    }
}

// function for get single post
exports.singlePost = async (req, res) => {
    try {
        const postData = await postmodel.findById(req.params.id).populate("userId", "-password")

        if (!postData) {
            return res.status(404).json({
                status: "Failed",
                Message: "No post found"
            })
        }

        res.status(200).json({
            status: "Success",
            data: postData,
        });

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Error In Fetching The Post" + error,
        });
    }
}

// function for update single post

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const postDataToUpdate = req.body;
    const date = new Date()
    postDataToUpdate.updatedAt = moment(date).tz(userTimeZone).format();
    try {
        const postData = await postmodel.findByIdAndUpdate(postId, postDataToUpdate);
        res.status(200).json({
            status: "Success",
            message: 'Post updated successfully',
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: 'Error while updating the Post' + error
        });
    }
}

// function for delete single post
exports.deletePost = async (req, res) => {
    try {

        const id = req.params.id;

        const deletedPost = await postmodel.findOneAndDelete({ _id: id }); // 
        res.status(200).json({
            status: "Success",
        });

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Error in deleting the Post!" + error
        });
    }
}


// Function to GET FILTER POsts
exports.getFilteredPosts = async (req, res) => {
    try {

        let filterQuery = {};

        if(req.body.userId !== undefined){
            filterQuery["userId"] = req.body.userId;
        }
        if (req.query.status !== undefined) {
            filterQuery["status"] = req.query.status;
        }
        if (req.query.category !== undefined) {
            filterQuery["Category"] = req.query.category;
        }

        let sortQuery;
        const sortOptions = {
            "titleasc": "Title",
            "titledes": "-Title",
            "viewasc": "view",
            "viewdes": "-view",
            "createasc": "createdAt",
            "createdes": "-createdAt"
        };

        if(req.query.sort !== undefined && sortOptions[req.query.sort]) {
            sortQuery = sortOptions[req.query.sort];
        }
        console.log("sortQuery",sortQuery)
        // const posts = await postmodel.find(filterQuery).populate("userId", "-password")
        const posts = await postmodel.find(filterQuery).sort(sortQuery).populate("userId", "-password")

        res.status(200).json({
            status: "Success",
            data: posts,
            total:posts.length,
        });

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Error In Filtering The Posts" + error,
        });
    }
}

