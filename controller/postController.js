const userModel = require("../model/userModel");
const postmodel = require("../model/postModel");
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const moment = require('moment-timezone');
const { uploadeCloudinary } = require("../utils/cloudinart");

// function for create post
exports.createPost = async (req, res) => {
    try {

        // Path to the uploaded file on the server
        const localFilePath = req.file.path;
        const imageData = await uploadeCloudinary(localFilePath);

        // chage image fields with url
        req.body.Featureimage = imageData.url;

        req.body.createdAt = moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
        req.body.updatedAt = moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')

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
            total: postData.length,
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
    if (!postDataToUpdate.view) {
        postDataToUpdate.updatedAt = moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
    }
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
            message: `Deleted Successfully`,
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

        if (req.query.userId !== undefined) {
            filterQuery["userId"] = req.query.userId;
        }
        if (req.query.status !== undefined) {
            filterQuery["status"] = req.query.status;
        }
        if (req.query.category !== undefined) {
            filterQuery["Category"] = req.query.category;
        }

        let sortQuery;
        const sortOptions = {
            "view": "view",
            "-view": "-view",
            "createdAt": "createdAt",
            "-createdAt": "-createdAt"
        };

        if (req.query.sort !== undefined && sortOptions[req.query.sort]) {
            sortQuery = sortOptions[req.query.sort];
        }

        let limit = req.query.limit || 10;
        let page_no = parseInt(req.query.page) || 1;

        // Calculate the offset for pagination
        let skipRecords = (page_no - 1) * limit;

        var total_data = await postmodel.find(filterQuery).count();
        var total_page = Math.ceil(total_data / limit);

        // const posts = await postmodel.find(filterQuery).populate("userId", "-password")
        const posts = await postmodel.find(filterQuery).sort(sortQuery || "-createdAt").populate("userId", "-password").skip(skipRecords).limit(limit)

        res.status(200).json({
            status: "Success",
            data: posts,
            total_data,
            page_no,
            total_page,
        });

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Error In Filtering The Posts" + error,
        });
    }
}

