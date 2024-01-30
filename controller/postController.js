const userModel = require("../model/userModel");
const postmodel = require("../model/postModel");

// function for create post
exports.createPost = async (req, res) => {
    try {

        const postData = await postmodel.create(req.body);
        console.log("createPost", postData);
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
        console.log("allPost", postData);
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

        if(!postData){
            return res.status(404).json({
                status:"Failed",
                Message :"No post found"
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
    try {
        const postData = await postmodel.findByIdAndUpdate(postId,postDataToUpdate);
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
            data: deletedPost,
        });

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Error in deleting the Post!" + cerror
        });
    }
}

