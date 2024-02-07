const postmodel = require("../model/postModel");
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const moment = require('moment-timezone');
const { uploadeCloudinary, deleteFromCloudinary } = require("../utils/cloudinart");
const { handleServerError } = require("../utils/handleServerError");
const HttpStatus = {
    OK: 200,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
};

// function for create post
exports.createPost = async (req, res) => {
    try {

        console.log("req.body", req.body);
        console.log("FILE", req.file);

        const { Title, status, Category, userId,Content } = req.body;

        // Path to the uploaded file on the server
        const { url, public_id } = await uploadeCloudinary(req.file.originalname);

        const postData = await postmodel.create({
            Title,
            status,
            Category,
            userId,
            Content,
            // Featureimage: url,
            // imageId: public_id,
            createdAt: moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)'),
            updatedAt: moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
        });

        res.status(HttpStatus.OK).json({
            status: "Success",
            message: "Post has been added successfully",
            data: postData,
            req: req
        });
    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
};

// function for get all post
exports.allPosts = async (req, res) => {
    try {

        const postData = await postmodel.find().populate("userId", "-password");
        res.status(HttpStatus.OK).json({
            status: "Success",
            data: postData,
            total: postData.length,
        });

    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
}

// function for get single post
exports.singlePost = async (req, res) => {
    try {
        const postData = await postmodel.findById(req.params.id).populate("userId", "-password")

        if (!postData) {
            return res.status(HttpStatus.OK).json({
                status: "Failed",
                Message: "No post found"
            })
        }

        res.status(HttpStatus.NOT_FOUND).json({
            status: "Success",
            data: postData,
        });

    } catch (error) {
        handleServerError(404, res, error);
    }
}

// function for update single post
exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const postDataToUpdate = req.body;
    try {
        console.log("postDataToUpdate", postDataToUpdate)
        const post = await postmodel.findOne({ _id: postId });
        console.log("post", post)
        if (!post) {
            return res.status(404).json({ status: "Failed", message: "No post found" });
        }

        if (postDataToUpdate.imageId) {
            deleteFromCloudinary(postDataToUpdate.imageId) //delete image from cloudinary server 
            // Path to the uploaded file on the server
            const { url, public_id } = await uploadeCloudinary(req.file.path);
            // chage image fields with url
            postDataToUpdate.Featureimage = url;
            postDataToUpdate.imageId = public_id;
        }

        if (postDataToUpdate.Title) {
            postDataToUpdate.updatedAt = moment().tz(userTimeZone).format('DD-MM-YYYY HH:mm:ss [GMT]Z (z)')
        }

        const updatedPost = await postmodel.findByIdAndUpdate(postId, postDataToUpdate);
        res.status(HttpStatus.OK).json({
            status: "Success",
            message: 'Post updated successfully',
            data: updatedPost,
        });
    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
}

// function for delete single post
exports.deletePost = async (req, res) => {
    try {

        const id = req.params.id;
        const deletedPost = await postmodel.findOneAndDelete({ _id: id });
        if (deletedPost && deletedPost.imageId) {
            deleteFromCloudinary(deletedPost.imageId) // deleting image from cloudinary server
        }
        res.status(HttpStatus.OK).json({
            status: "Success",
            message: `Deleted Successfully`,
        });

    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
}

// Function to GET FILTER POsts
exports.getFilteredPosts = async (req, res) => {
    try {

        let filterQuery = {};

        if (req.query.userId !== undefined) filterQuery["userId"] = req.query.userId;
        if (req.query.status !== undefined) filterQuery["status"] = req.query.status;
        if (req.query.category !== undefined) filterQuery["Category"] = req.query.category;

        const sortOptions = ["view", "-view", "createdAt", "-createdAt"];

        let sortQuery = "-createdAt"; // Default sorting

        if (req.query.sort !== undefined && sortOptions.includes(req.query.sort)) {
            sortQuery = req.query.sort;
        };

        let limit = req.query.limit || 10;
        let page_no = parseInt(req.query.page) || 1;
        let skipRecords = (page_no - 1) * limit;

        var total_data = await postmodel.find(filterQuery).count();
        var total_page = Math.ceil(total_data / limit);

        // const posts = await postmodel.find(filterQuery).populate("userId", "-password")
        const posts = await postmodel.find(filterQuery).sort(sortQuery || "-createdAt").populate("userId", "-password").skip(skipRecords).limit(limit)

        res.status(HttpStatus.OK).json({
            status: "Success",
            data: posts,
            total_data,
            page_no,
            total_page,
        });

    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
}

